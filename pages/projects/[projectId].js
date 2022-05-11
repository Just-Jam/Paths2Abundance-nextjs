import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getProject = async (projectId) => {
    let { data: Projects, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('id', projectId)
    return Projects
}

export default function Project({ projectData }){
    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
        console.log(projectData)
    },[])
    
    if(projectData[0]){
        return (
            <div>
                <h1>Solution {projectId}</h1>
                <h2>{projectData[0].status}</h2>
                <p>{projectData[0].other_info}</p>
                <p>{projectData[0].solution_id}</p>
                <p>{projectData[0].organization_id}</p>
            </div>
        )
    } else {
        return (
            <div> Project not found </div>
        )
    }
}

export async function getServerSideProps(context) {

    const projectData = await getProject(context.params.projectId)

    return {
        props: { projectData }, // will be passed to the page component as props
    }
}
