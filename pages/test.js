import Link from 'next/link';
import { supabase } from '../utils/client';
import { useEffect } from 'react';
import { HashConnect } from 'hashconnect';
import { 
    ContractExecuteTransaction,
    ContractCallQuery,
} from '@hashgraph/sdk';

export default function Test({ Projects }) {
    let hashconnect = new HashConnect();

    let saveData = {
        topic: "",
        pairingString: "",
        privateKey: "",
        pairedWalletData: null,
        pairedAccounts: []
    }

    const appMetadata = {
        name: "Paths2Abundance",
        description: "Paths2Abundance",
        icon: "https://paths2abundance.com/favicon.ico",
    }

    const initHashconnect = async () => {
        if(!loadLocalData()){
        //first init and store the private for later
        let initData = await hashconnect.init(appMetadata);
        saveData.privateKey = initData.privKey;

        //then connect, storing the new topic for later
        const state = await hashconnect.connect();
        saveData.topic = state.topic;
        
        //generate a pairing string, which you can display and generate a QR code from
        saveData.pairingString = hashconnect.generatePairingString(state, "testnet", true);
        
        //find any supported local wallets
        hashconnect.findLocalWallets();
        } else {
        await hashconnect.init(appMetadata, saveData.privateKey);
        await hashconnect.connect(saveData.topic, saveData.pairedWalletData);
        }
        setUpEvents();
        console.log("Paring String: ", saveData.pairingString)
    }

    const setUpEvents = async () => {
        hashconnect.pairingEvent.once((pairingData) => {
        //example
        pairingData.accountIds.forEach(id => {
            if(saveData.pairedAccounts.indexOf(id) == -1)
                saveData.pairedAccounts.push(id);
        })
        saveData.pairedWalletData = pairingData;
        saveDataInLocalStorage();
        console.log(pairingData)
        console.log(saveData.pairedAccounts)
        })
    }

    const saveDataInLocalStorage = () => {
        let data = JSON.stringify(saveData);
        localStorage.setItem("hashconnectData", data)
    }

    const loadLocalData = () => {
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
        saveData = JSON.parse(foundData);
        console.log("Found local data", saveData)
        return true;
        }
        else return false;
    }
    //Works
    const getBalance = async () => {
        let HashConnectProvider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
        let balance = await HashConnectProvider.getAccountBalance(saveData.pairedAccounts[0]);
        console.log(balance)
    }

    const createProjectNFT = async() => {
        const createProjectTx = await new ContractExecuteTransaction()
    }
    
    return (
        <div>
            <li>
                <Link href="/">
                    Home Page
                </Link>
            </li>
            <h1>Test Page</h1>
            <button onClick={() => initHashconnect()}>Connect Wallet</button>
        </div>
    )
}

const getProject = async (projectId) => {
    let { data: Projects, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('id', projectId)
    return Projects
}

export async function getServerSideProps() {
  
    const fetchProjects = async () => {
      let { data: Projects, error } = await supabase
      .from('Projects')
      .select('*')
      return Projects
    }

    const Projects =  await fetchProjects();
    
    return { props: { Projects } }
}