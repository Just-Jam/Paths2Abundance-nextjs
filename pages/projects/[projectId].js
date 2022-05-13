import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { mintProjectNFT } from "../../utils/hashconnectService";

const getProject = async (projectId) => {
    let { data: project, error } = await supabase
    .from('Projects')
    .select(`*
    `)
    .eq('id', projectId)

    console.log("Project retrieved by ID")
    console.log(project)
    return project
}

const getSolution = async (projectId) => {
    let { data: solution, error } = await supabase
    .from('Solutions')
    .select(`*`)
    .eq('id', projectId)

    console.log("solution retrieved for project")
    console.log(solution)
    return solution
}

const getOrganization = async (projectId) => {
    let { data: organization, error } = await supabase
    .from('Organizations')
    .select(`*`)
    .eq('id', projectId)

    console.log("Organization retrieved for project")
    console.log(organization)
    return organization
}



export default function Project({ project, solution, organization }){
    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
        console.log(project)
    },[])
    
    if(project[0]){
        return (
            <div>
                <h1><b>{project[0].id} in {project[0].country}</b></h1>
                <h2>Budget USD: {project[0].budget_usd}</h2>
                <h2>Duration: {project[0].project_duration_days}days</h2>
                <h2>Status: {project[0].status}</h2>
                <h2>Organization: {organization[0].name}</h2>
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

    const project = await getProject(context.params.projectId)

    const solution = await getSolution(context.params.projectId)

    const organization = await getOrganization(context.params.projectId)

    return {
        props: { project, solution, organization }, // will be passed to the page component as props
    }
}
