import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";


const getProject = async (projectId) => {
    let { data: Projects, error } = await supabase
    .from('Projects')
    .select(`*`)
    .eq('id', projectId)
    console.log("Retrieved projects")
    console.log(Projects)
    return Projects
}

const getSolution = async (projectId) => {
    let { data: Solutions, error } = await supabase
    .from('Solutions')
    .select(`*`)
    .eq('id', projectId)
    console.log("Retrieved solutions")
    console.log(Solutions)
    return Solutions
}


export default function Project({ projectData, solutionData }){
    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
        console.log("This is project data")
        console.log(projectData)
        console.log(solutionData)
    },[])
    
    if(projectData[0]){
        return (
            <div>
                <h1>Solution {projectId}</h1>
                <h2>{projectData[0].status}</h2>
                <p>{projectData[0].other_info}</p>
                <p>{projectData[0].solution_id}</p>
                <p>{solutionData[0].name}</p>
                <p>{solutionData[0].category}</p>
                <p>{solutionData[0].nature}</p>
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

    const solutionData = await getSolution(context.params.projectId)

    return {
        props: { projectData, solutionData }, // will be passed to the page component as props
    }
}
