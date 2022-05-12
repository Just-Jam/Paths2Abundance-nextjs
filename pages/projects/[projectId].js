import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { mintProjectNFT } from "../../utils/hashconnectService";

const getProject = async (projectId) => {
    let { data: project, error } = await supabase
    .from('Projects')
    .select(`
      id,
      solution_id,
      organization_id,
      budget_usd,
      country,
      project_duration_days,
      status,
      Solutions(name),
      Organizations(name)
    `)
    .eq('id', projectId)

    console.log(project)
    return project
}

export default function Project({ project }){
    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
        console.log(project)
    },[])
    
    if(project[0]){
        return (
            <div>
                <h1><b>{project[0].Solutions.name} in {project[0].country}</b></h1>
                <h2>Budget USD: {project[0].budget_usd}</h2>
                <h2>Duration: {project[0].project_duration_days} days</h2>
                <h2>Status: {project[0].status}</h2>
                <h2>Organization: {project[0].organization_id}</h2>
                <h2>Solution Id: {project[0].solution_id}</h2>
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

    return {
        props: { project }, // will be passed to the page component as props
    }
}
