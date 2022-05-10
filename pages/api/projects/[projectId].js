import { supabase } from "../../../utils/client";

const getProject = async (projectId) => {
    let { data: Projects, error } = await supabase.from('Projects').select('*').eq('id', projectId)
    return Projects
}

export default async function projectHandler(req, res){
    const {projectId} = req.query;
    const project = await getProject(projectId);
    if(!project[0]){
        res.status(404).json({error: "Project not found"})
    }
    else {
        res.status(200).json(solution[0]);
    }
}