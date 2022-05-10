import { supabase } from "../../../utils/client";

const getSolution = async (solutionId) => {
    let { data: Solutions, error } = await supabase.from('Solutions').select('*').eq('id', solutionId)
    return Solutions
}

export default async function solutionHandler(req, res){
    const {solutionId} = req.query;
    const solution = await getSolution(solutionId);
    if(!solution[0]){
        res.status(404).json({error: "Solution not found"})
    }
    else {
        res.status(200).json(solution[0]);
    }
}