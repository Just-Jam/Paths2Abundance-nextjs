import { HashConnect } from 'hashconnect'
import { 
    AccountId, 
    ContractCallQuery, 
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar,
} from '@hashgraph/sdk'

import NFTID from '../contractsData/NFT-id.json'
import PathTokenID from '../contractsData/PathToken-id.json'

let hashconnect = new HashConnect();

let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: null,
    pairedAccounts: [],
    pathTokenBalance: 0,
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
        pairingData.accountIds.forEach(id => {
            if(saveData.pairedAccounts.indexOf(id) == -1){
                saveData.pairedAccounts.push(id);
            }
        })
        saveData.pairedWalletData = pairingData;
        saveDataInLocalStorage();
    })

    hashconnect.transactionEvent.once((transactionData) => {
        console.log("Transaction success: ", transactionData)
    })
}

const saveDataInLocalStorage = () => {
    let data = JSON.stringify(saveData);
    localStorage.setItem("hashconnectData", data)
}

const clearPairings = () => {
    saveData.pairedAccounts = [];
    saveData.pairedWalletData = undefined;
    localStorage.removeItem("hashconnectData");
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

//Works
const createProjectNFT = async() => {
    console.log("Creating Project NFT")
    let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
    let signer = hashconnect.getSigner(provider)
    const account1ID = accountIDs.account1.accountId;
    const address = AccountId.fromString(account1ID).toSolidityAddress()
    console.log(address)
    const createProjectTx = await new ContractExecuteTransaction()
        .setContractId(`0.0.${NFTID.contractID.num.low}`)
        .setGas(1000000) //0.45 Hbar
        .setFunction(
            "createProject", 
            new ContractFunctionParameters()
                .addUint256(10000)
                .addUint256(1000)
                .addString("Project 1")
                .addAddress(address)
        )
        .freezeWithSigner(signer)
    
    let res = await createProjectTx.executeWithSigner(signer)
    console.log(res)
}

const mintProjectNFT = async(projectId, mintPriceHBAR, mintAmount) => {
    console.log("Minting Project NFT")
    let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
    let signer = hashconnect.getSigner(provider)
    const mintNFTTx = await new ContractExecuteTransaction()
        .setContractId(`0.0.${NFTID.contractID.num.low}`)
        .setGas(1000000) //0.45 Hbar
        .setFunction(
            "mint",
            new ContractFunctionParameters()
            .addUint256(projectId)
            .addUint256(mintAmount)
        )
        .setPayableAmount(new Hbar(mintAmount * mintPriceHBAR))
        .freezeWithSigner(signer)
    
    let res = await mintNFTTx.executeWithSigner(signer)
    console.log(res)
}

const getPATHBalance = async() => {
    let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
    let signer = hashconnect.getSigner(provider)
    let address = AccountId.fromString(saveData.pairedAccounts[0]).toSolidityAddress()
    const getBalanceTx = await new ContractCallQuery()
        .setContractId(`0.0.${PathTokenID.contractID.num.low}`)
        .setGas(1000000)
        .setFunction(
            "balanceOf",
            new ContractFunctionParameters()
            .addAddress(address)
        )
        .setQueryPayment(new Hbar(10))
        
    let res = await getBalanceTx.executeWithSigner(signer)
    console.log("Raw result: ", res)
}

export {  
    initHashconnect, 
    mintProjectNFT,
    clearPairings,
    getPATHBalance
}