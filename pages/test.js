import Link from 'next/link';
import { supabase } from '../utils/client';
import { useEffect } from 'react';
import { HashConnect } from 'hashconnect';
import { 
    ContractExecuteTransaction,
    ContractCallQuery,
    ContractFunctionParameters,
    AccountId,
    Client,
    TransferTransaction,
} from '@hashgraph/sdk';
import { hethers } from '@hashgraph/hethers';

import NFTABI from '../contractsData/NFTV2.json'
import NFTID from '../contractsData/NFTV2-id.json'
import accountIDs from '../accounts.json'

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
        hashconnect.connectToLocalWallet(saveData.pairingString);
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
        console.log("Creating Project NFT")
        //const client = Client.forTestnet().setOperator(saveData.pairedAccounts[0], saveData.privateKey);
        let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
        let signer = hashconnect.getSigner(provider)
        const account1ID = accountIDs.account1.accountId;
        const address = AccountId.fromString(account1ID).toSolidityAddress()
        console.log(address)
        // const createProjectTx = await new ContractExecuteTransaction()
        //     .setContractId(`0.0.${NFTID.contractID.num.low}`)
        //     .setGas(100000)
        //     .setFunction(
        //         "createProject", 
        //         new ContractFunctionParameters()
        //         .addUint256(10000)
        //         .addUint256(1000)
        //         .addString("Project 1")
        //         .addAddress(address)
        //     )
        //     .freezeWithSigner(signer)
        
        // const submitTx = await createProjectTx.execute(client)
        // const txReceipt = await submitTx.getReceipt(client)
        // console.log("Reciept: " , txReceipt)
    }

    const createProjectNFT2 = async() => {
        console.log("Initiating Contract...")
        console.log(saveData.privateKey)
        let provider = hethers.getDefaultProvider('testnet')
        //let signer = new hethers.Wallet(saveData.privateKey, provider)
        console.log("Hethers Provider: ", provider)
        const contractAbi = NFTABI.abi;
        const contractAddress = AccountId.fromString(`0.0.${NFTID.contractID.num.low}`).toSolidityAddress()

        // const nftContract = new hethers.Contract(contractAddress, contractAbi, signer);

        // console.log(nftContract)
    }

    const hashconnectTx = async() => {
        let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
        let signer = hashconnect.getSigner(provider)

        console.log("Hashconnect Provider: ", provider)
        console.log("Hashconnect Signer: ", signer)

        let trans = await new TransferTransaction()
            .addHbarTransfer(AccountId.fromString(saveData.pairedAccounts[0]), -1)
            .addHbarTransfer(AccountId.fromString("0.0.34223374"), 1)
            .freezeWithSigner(signer)
        let res = await trans.executeWithSigner(signer)
        console.log(res)
    }

    const sendTx = async(trans, acctToSign) => {
        let transactionBytes = await SigningService.signAndMakeBytes(trans);
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
            <button onClick={() => hashconnectTx()}>HashConnect Transaction</button>
            <button onClick={() => createProjectNFT2()}>Create Project NFT</button>
        </div>
    )
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