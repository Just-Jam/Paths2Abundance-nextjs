import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
    const { projectId } = router.query;

    useEffect(() => {
        console.log(saveData)
    },[])
    
    if(project[0]){
        return (
            <div>
                <h1><b>{solution[0].name} in {project[0].country}</b></h1>
                <h2>Budget USD: {project[0].budget_usd}</h2>
                <h2>Duration: {project[0].project_duration_days}days</h2>
                <h2>Status: {project[0].status}</h2>
                <h2>Organization: {organization[0].name}</h2>
                <h2>Organization Wallet: {organization[0].wallet_address}</h2>
                <h2>Solution: {solution[0].name}</h2>
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
