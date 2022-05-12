import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";


const getProject = async (projectId) => {
    let { data: project, error } = await supabase
    .from('Projects')
    .select(`*`)
    .eq('id', projectId)
<<<<<<< HEAD
    return project
}

export default function Project({ project }){
=======
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
>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
    const router = useRouter();
    const { projectId } = router.query;

    useEffect(() => {
<<<<<<< HEAD
        console.log(project)
=======
        console.log("This is project data")
        console.log(projectData)
        console.log(solutionData)
>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
    },[])
    
    if(project[0]){
        return (
            <div>
                <h1>Solution {projectId}</h1>
<<<<<<< HEAD
                <h2>{project[0].status}</h2>
                <p>{project[0].other_info}</p>
                <p>{project[0].solution_id}</p>
                <p>{project[0].organization_id}</p>
=======
                <h2>{projectData[0].status}</h2>
                <p>{projectData[0].other_info}</p>
                <p>{projectData[0].solution_id}</p>
                <p>{solutionData[0].name}</p>
                <p>{solutionData[0].category}</p>
                <p>{solutionData[0].nature}</p>
>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
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

    const solutionData = await getSolution(context.params.projectId)

    return {
<<<<<<< HEAD
        props: { project }, // will be passed to the page component as props
=======
        props: { projectData, solutionData }, // will be passed to the page component as props
>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
    }
}
