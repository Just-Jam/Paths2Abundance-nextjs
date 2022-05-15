import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import  OrganizationsSingle  from "../../components/OrganizationsSingle"

const fetchOrg = async (organizationId) => {
    let { data: organization, error } = await supabase
        .from('Organizations')
        .select(`*`)
        .eq('id', organizationId)
    console.log("At fetchOrgs")
    console.log(organization)
    return organization
}

export default function Organization({ organization }) {
    console.log("Inside the react component")
    console.log(organization)
    
    if (organization[0]) {
        return (
            <div>
                <OrganizationsSingle  organization={organization}/>
            </div>
        )
    } else {
        return (
            <div> Organization not found </div>
        )
    }
}

export async function getServerSideProps(context) {

    const organization = await fetchOrg(context.params.organizationId)
    console.log("At get props")
    console.log(organization)
    return {
        props: { organization }, // will be passed to the page component as props
    }
}


// export default function Organization({ organization }){
//     const router = useRouter();
//     const { organizationId } = router.query;

//     useEffect(() => {
//         console.log(organization)
//     },[])
    
//     if(organization[0]){
//         return (
//             <div>
//                 <h1>Organization {organizationId}</h1>
//                 <h2>{organization[0].name}</h2>
//                 <p>{organization[0].website}</p>
//                 <p>{organization[0].country}</p>
//                 <p>{organization[0].active}</p>
//             </div>
//         )
//     } else {
//         return (
//             <div> Organization not found </div>
//         )

