import { supabase } from '../utils/client';
import UserInfoComponent from '../components/UserInfoComponent' 
import { useEffect, useState } from "react";
import { getPATHBalance, clearPairings } from "../utils/hashconnectService";


export default function Profile({ Projects, OrgWallets }) {

    const [saveData, setSaveData] = useState({
        topic: "",
        pairingString: "",
        privateKey: "",
        pairedWalletData: null,
        pairedAccounts: [],
        pathTokenBalance: 0,
        recentDonatedProjects: []
    });
    const [userNFTs, setUserNFTs] = useState([]);

    const getPathTokenBalance = async () => {
        let balance = await getPATHBalance();
        setSaveData({ ...saveData, pathTokenBalance: balance });
    }


    useEffect(() => {
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
            setSaveData(JSON.parse(foundData))
            // let userNFTData = JSON.parse(localStorage.getItem("userNFTs"))
            // if(userNFTData != null){
            //     let userNFTArray =[]
            //     for(let i = 0; i < userNFTData.length; i++){
            //         if(userNFTData[i].accountId == saveData.pairedAccounts[0]){
            //             userNFTArray.push(userNFTData[i])
            //         }
            //     }
            //     setUserNFTs(userNFTArray)
            // }

            
        }
        setUserNFTs([
            {accountId: "0.0.34204037", projectId: 1},
            {accountId: "0.0.34204037", projectId: 2}
        ])
        console.log("UserNFTs: ", userNFTs)
        console.log(OrgWallets)
    },[])
    return (
        <div>
            {saveData != null ? (
                <div>
                    <UserInfoComponent saveData={saveData} OrgWallets={OrgWallets}/>
                    <h3><b>Your NFTs:</b></h3>
                    {userNFTs.length > 0 ? (
                        <div>
                            {userNFTs.map(nft =>{
                                <div key={nft}>
                                    {nft.accountId == saveData.pairedAccounts[0] ? (
                                        <h3>Project ID: {nft.projectId}</h3>
                    
                                    ) : (
                                        <></>
                                    )}
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
            <button onClick={() => getPathTokenBalance()}>Update PATH Balance</button>
            <button onClick={() => clearPairings()}>Clear Pairings</button>
        </div>
    );
}

export async function getServerSideProps() {
  
    const fetchProjects = async () => {
      let { data: Projects, error } = await supabase
        .from('Projects')
        .select(`
        id,
        solution_id,
        organization_id,
        budget_usd,
        country,
        project_duration_days,
        status,
        mintPriceHBAR,
        maxNFTSupply,
        Solutions(name, image_file_name),
        Organizations(name)
      `)
        .order('id', { ascending: true })
  
      console.log(Projects)
      return Projects
    }

    const fetchOrgWallets = async () => {
        let { data: OrgWallets, error } = await supabase
        .from('Organizations')
        .select('wallet_address')
        return OrgWallets
    }

    const Projects = await fetchProjects();
    const OrgWallets = await fetchOrgWallets();
  
    return { props: { Projects, OrgWallets } }
  }