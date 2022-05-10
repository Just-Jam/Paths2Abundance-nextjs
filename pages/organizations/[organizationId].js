import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getOrganization = async (organizationId) => {
    let { data: Organizations, error } = await supabase
    .from('Organizations')
    .select('*')
    .eq('id', organizationId)
    return Organizations
}

export default function Organization({ organizationData }){
    const router = useRouter();
    const { organizationId } = router.query;

    useEffect(() => {
        console.log(organizationData)
    },[])
    
    if(organizationData[0]){
        return (
            <div>
                <h1>Solution {organizationId}</h1>
                <h2>{organizationData[0].name}</h2>
                <p>{organizationData[0].website}</p>
            </div>
        )
    } else {
        return (
            <div> Organization not found </div>
        )
    }
}

export async function getServerSideProps(context) {

    const organizationData = await getOrganization(context.params.organizationId)

    return {
        props: { organizationData }, // will be passed to the page component as props
    }
}
