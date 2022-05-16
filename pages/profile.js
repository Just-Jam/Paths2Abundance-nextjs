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

    const getPathTokenBalance = async () => {
        let balance = await getPATHBalance();
        setSaveData({ ...saveData, pathTokenBalance: balance });
    }

    useEffect(() => {
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
            setSaveData(JSON.parse(foundData))
        }
    },[])
    return (
        <div>
            {saveData.pairedWalletData != null ? (
                <div>
                    <UserInfoComponent saveData={saveData} OrgWallets={OrgWallets} Projects={Projects}/>
                </div>
            ) :(
                <div>You are not logged in</div>
            ) }
            
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