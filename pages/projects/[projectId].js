import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProjectsSingle from "../../components/ProjectsSingle";
import { saveData, mintProjectNFT } from "../../utils/hashconnectService";

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
    const [saveData, setSaveData] = useState(null);

    useEffect(() => {
        let foundData = localStorage.getItem("hashconnectData")
        if(foundData){
            setSaveData(JSON.parse(foundData));
        }
    },[])
    
    if(project[0]){
        return (
            <div>
                <ProjectsSingle solution={solution} project={project} organization={organization}/>
                {/* {saveData.pairedAccounts[0] == organization[0].wallet_address ? (
                    <div>
                        Your Organization
                    </div>
                ) : (
                    <div>
                    </div>
                )} */}
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
