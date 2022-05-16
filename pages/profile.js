import { Hbar, HbarUnit } from "@hashgraph/sdk";
import { useEffect, useState } from "react";
import { getPATHBalance, clearPairings } from "../utils/hashconnectService";

export default function UserInfo() {

    const [saveData, setSaveData] = useState({
        topic: "",
        pairingString: "",
        privateKey: "",
        pairedWalletData: null,
        pairedAccounts: [],
        pathTokenBalance: 0,
    });
    const [userNFTs, setUserNFTs] = useState([]);

    const getPathTokenBalance = async () => {
        let balance = await getPATHBalance();
        setSaveData({ ...saveData, pathTokenBalance: balance });
    }
    useEffect(() => {
        console.log(userNFTs)
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
            let userNFTData = localStorage.getItem("userNFTs")
            setSaveData(JSON.parse(foundData))
            if(userNFTData != null){setUserNFTs(JSON.parse(userNFTData))}
        }
    },[])
    return (
        <div>
            <h1><b>UserInfo</b></h1>
            {saveData != null ? (
                <div>
                    You are logged in
                    <h2>Wallet Address: {saveData.pairedAccounts[0]}</h2>
                    <h3>Path Token Balance: {saveData.pathTokenBalance}</h3>
                    <h3><b>Your NFTs:</b></h3>
                    {userNFTs.length > 0 ? (
                        <div>
                            {userNFTs.map(nft =>{
                                <div key={nft.id}>
                                    <h4>{nft.name}</h4>
                                </div>
                            })}
                        </div>
                    ) : (
                        <div>
                            <h3>You do not own any NFTs</h3>
                        </div>
                    )}
                </div>
            ) :(
                <div>You are not logged in</div>
            ) }
            <button onClick={() => console.log(saveData)}>Get saveData</button>
            <button onClick={() => getPathTokenBalance()}>Get Path Balance</button>
            <button onClick={() => clearPairings()}>Clear Pairings</button>
        </div>
    );
}