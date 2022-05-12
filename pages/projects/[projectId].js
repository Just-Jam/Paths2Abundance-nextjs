import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getProject = async (projectId) => {
    let { data: project, error } = await supabase
    .from('Projects')
    .select('*')
    .eq('id', projectId)
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
                <h1>Solution {projectId}</h1>
                <h2>{project[0].status}</h2>
                <p>{project[0].other_info}</p>
                <p>{project[0].solution_id}</p>
                <p>{project[0].organization_id}</p>
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
