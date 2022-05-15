import { Hbar, HbarUnit } from "@hashgraph/sdk";
import { useEffect, useState } from "react";
import { getPATHBalance, clearPairings } from "../utils/hashconnectService";

export default function UserInfo() {

    const [saveData, setSaveData] = useState(null);
    const [pathTokenBalance, setPathTokenBalance] = useState(0);


    const getPathTokenBalance = async () => {
        let balance = await getPATHBalance();
        setPathTokenBalance(balance);
    }
    useEffect(() => {
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
            setSaveData(JSON.parse(foundData));
        }
    },[])
    return (
        <div>
            <h1><b>UserInfo</b></h1>
            {saveData != null ? (
                <div>
                    You are logged in
                    <h2>Wallet Address: {saveData.pairedAccounts[0]}</h2>
                    <h3>Path Token Balance: {pathTokenBalance}</h3>
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