import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProjectsSingle from "../../components/ProjectsSingle";
import { Hbar } from "@hashgraph/sdk";
import { createProjectNFT, getProjectInfo, claimHBAR, mintProjectNFT } from "../../utils/hashconnectService";

const fetchProject = async (projectId) => {
    let { data: project, error } = await supabase
    .from('Projects')
    .select(`*
    `)
    .eq('id', projectId)
    console.log(project)
    return project
}

const fetchSolution = async (solutionId) => {
    let { data: solution, error } = await supabase
    .from('Solutions')
    .select(`*`)
    .eq('id', solutionId)
    console.log(solution)
    return solution
}

const fetchOrg = async (organizationId) => {
    let { data: organization, error } = await supabase
    .from('Organizations')
    .select(`*`)
    .eq('id', organizationId)
    console.log(organization)
    return organization
}

export default function Project({ project, solution, organization }){
    const router = useRouter();
    const [saveData, setSaveData] = useState({
        topic: "",
        pairingString: "",
        privateKey: "",
        pairedWalletData: null,
        pairedAccounts: [],
        pathTokenBalance: 0,
    });
    const [mintAmount, setMintAmount] = useState(0);

    useEffect(() => {
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
            setSaveData(JSON.parse(foundData));
        }
        console.log(project[0].mintPriceHBAR)
        console.log(new Hbar(project[0].mintPriceHBAR).toTinybars())
    },[])
    
    if(project[0]){
        return (
            <div>
                <ProjectsSingle solution={solution} project={project} organization={organization}/>
                {saveData.pairedAccounts[0] == organization[0].wallet_address ? (
                    <div>
                        Your Organization
                        <button onClick={() => claimHBAR(project[0].id)}>Claim HBAR</button>
                    </div>
                ) : (
                    <div>
                    </div>
                )}
                {project[0].id > 0 ? (<button onClick={() => createProjectNFT(
                    project[0].mintPriceHBAR,
                    project[0].maxNFTSupply,
                    organization[0].wallet_address,
                    `${solution[0].name} in ${project[0].country}`
                )}>createProjectNFT</button>
                ) : (
                    <div>
                        <button onClick={() => mintProjectNFT(
                            project[0].id,
                            project[0].mintPriceHBAR,
                            1
                        )}>Mint 1 Project NFT</button>
                    </div>
                )}
                

                <button onClick={() => getProjectInfo(project[0].id)}>getProjectInfo</button>
            </div>
        )
    } else {
        return (
            <div> Project not found </div>
        )
    }
}

export async function getServerSideProps(context) {

    const project = await fetchProject(context.params.projectId)
    let solution, organization

    if(project[0]){
        solution = await fetchSolution(project[0].solution_id)
        organization = await fetchOrg(project[0].organization_id)
    } else {
        solution = []
        organization = []
    }

    return {
        props: { project, solution, organization }, // will be passed to the page component as props
    }
}
