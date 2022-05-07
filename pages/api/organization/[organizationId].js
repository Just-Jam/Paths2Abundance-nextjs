import { supabase } from "../../../utils/client";

const getOrganization = async (organizationId) => {
    let { data: Organizations, error } = await supabase
    .from('Organizations')
    .select('*')
    .eq('id', organizationId)
    return Organizations
}

export default async function organizationHandler(req, res){
    const {organizationId} = req.query;
    const organization = await getOrganization(organizationId);
    if(!organization[0]){
        res.status(404).json({error: "Organization not found"})
    }
    else {
        res.status(200).json(organization[0]);
    }
}