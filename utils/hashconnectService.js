import { HashConnect } from 'hashconnect'
import { 
    AccountId, 
    ContractCallQuery, 
    ContractExecuteTransaction,
    ContractFunctionParameters,
    Hbar,
    Client
} from '@hashgraph/sdk'
import { Interface } from "@ethersproject/abi";

import NFTID from '../contractsData/NFT-id.json'
import NFTAbi from '../contractsData/NFTV3.json'
import PathTokenID from '../contractsData/PathToken-id.json'

let hashconnect = new HashConnect();

let nftAbi = NFTAbi.abi
let abiInterface = new Interface(nftAbi);

let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: null,
    pairedAccounts: [],
    pathTokenBalance: 0,
}

let userNFTs = []

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
        await hashconnect.pair(saveData.pairedWalletData, saveData.pairedAccounts, 'testnet')
    }
    setUpEvents();
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
}

const saveDataInLocalStorage = () => {
    let data = JSON.stringify(saveData);
    localStorage.setItem("hashconnectData", data)
}

const saveUserNFTData = () => {
    let data = JSON.stringify(userNFTs);
    localStorage.setItem("userNFTs", data)
}

const clearPairings = () => {
    saveData.pairedAccounts = [];
    saveData.pairedWalletData = undefined;
    localStorage.removeItem("hashconnectData");
}

const loadLocalData = () => {
    let foundData = localStorage.getItem("hashconnectData")
    if(foundData){
        let userNFTData = localStorage.getItem("userNFTs")
        saveData = JSON.parse(foundData);
        if(userNFTData != null){userNFTs = JSON.parse(userNFTData)}
        console.log("Found local data", saveData)
        console.log("Found local userNFTs", userNFTs)
        return true;
    }
    else return false;
}

//Works
const createProjectNFT = async(mintPriceHBAR, maxSupply, orgWallet, name) => {
    console.log("Creating Project NFT")
    let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
    let signer = hashconnect.getSigner(provider)
    const address = AccountId.fromString(orgWallet).toSolidityAddress()
    console.log(address)
    console.log(typeof(maxSupply))
    console.log(`0.0.${NFTID.contractID.num.low}`)
    const createProjectTx = await new ContractExecuteTransaction()
        .setContractId(`0.0.${NFTID.contractID.num.low}`)
        .setGas(1000000) //0.45 Hbar
        .setFunction(
            "createProject", 
            new ContractFunctionParameters()
                .addUint256(new Hbar(mintPriceHBAR).toTinybars())
                .addUint256(maxSupply)
                .addString(name)
                .addAddress(address)
        )
        .freezeWithSigner(signer)
    
    let res = await createProjectTx.executeWithSigner(signer)
    console.log(res)
}

const getProjectInfo = async(projectId) => {
    const accountId = process.env.NEXT_PUBLIC_ACCOUNTID
    const privateKey = process.env.NEXT_PUBLIC_PVKEY

    if (accountId == null ||
        privateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }
    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    const getProjectInfoTx = await new ContractCallQuery()
        .setContractId(`0.0.${NFTID.contractID.num.low}`)
        .setGas(1000000) //0.45 Hbar
        .setFunction(
            "getProject",
            new ContractFunctionParameters()
            .addUint256(projectId)
        )
        .setQueryPayment(new Hbar(1))
        .execute(client)

    let res = abiInterface.decodeFunctionResult("getProject", getProjectInfoTx.bytes)
    console.log(res[0])
    return res[0]
}

const getProjectTotalSupply = async(projectId) => {
    const accountId = process.env.NEXT_PUBLIC_ACCOUNTID
    const privateKey = process.env.NEXT_PUBLIC_PVKEY

    if (accountId == null ||
        privateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }
    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);
    const getTotalSupplyTx = await new ContractCallQuery()
        .setContractId(`0.0.${NFTID.contractID.num.low}`)
        .setGas(1000000) //0.45 Hbar
        .setFunction(
            "totalSupply",
            new ContractFunctionParameters()
            .addUint256(projectId)
        )
        .setQueryPayment(new Hbar(1))
        .execute(client)

    let res = getTotalSupplyTx.getUint256().toNumber()
    console.log("NFT supply: ", res)
    return res
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
        console.log(new Hbar(mintAmount * mintPriceHBAR))
    
    let res = await mintNFTTx.executeWithSigner(signer)
    console.log(res)
    //add nfts to local storage
    for(let i = 0; i < mintAmount; i++){
        userNFTs.push({
            accountId: saveData.pairedAccounts[0],
            projectId: projectId,
        })
    }
    saveUserNFTData();
}

const getPATHBalance = async() => {
    const accountId = process.env.NEXT_PUBLIC_ACCOUNTID
    const privateKey = process.env.NEXT_PUBLIC_PVKEY

    if (accountId == null ||
        privateKey == null ) {
        throw new Error("Environment variables myAccountId and myPrivateKey must be present");
    }
    const client = Client.forTestnet();
    client.setOperator(accountId, privateKey);

    let address = AccountId.fromString(saveData.pairedAccounts[0]).toSolidityAddress()
    const getBalanceTx = await new ContractCallQuery()
        .setContractId(`0.0.${PathTokenID.contractID.num.low}`)
        .setGas(5000000)
        .setFunction(
            "balanceOf",
            new ContractFunctionParameters()
                .addAddress(address)
        )
        .setQueryPayment(new Hbar(1))
        
    let res = await getBalanceTx.execute(client)
    let value = res.getUint256().toNumber() * 1e-8
    console.log(value)
    saveData.pathTokenBalance = value
    saveDataInLocalStorage();
    return value
}

const claimHBAR = async(projectId) => {
    let provider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
    let signer = hashconnect.getSigner(provider)
    const claimHBARTx = await new ContractExecuteTransaction()
        .setContractId(`0.0.${NFTID.contractID.num.low}`)
        .setGas(1000000) //0.45 Hbar
        .setFunction(
            "withdrawEth",
            new ContractFunctionParameters()
            .addUint256(projectId)
        )
        .freezeWithSigner(signer)
    
    let res = await claimHBARTx.executeWithSigner(signer)
    console.log(res)
}

export {  
    initHashconnect, 
    mintProjectNFT,
    clearPairings,
    getPATHBalance,
    createProjectNFT,
    getProjectInfo,
    claimHBAR,
    loadLocalData,
    getProjectTotalSupply
}