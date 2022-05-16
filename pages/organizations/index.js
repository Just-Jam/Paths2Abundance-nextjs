import { useEffect } from "react";
import { supabase } from "../../utils/client";
import OrganizationsComponent from "../../components/OrganizationsComponent";

export default function Organizations({ Organizations }) {

    useEffect(() => {
        console.log(Organizations)
    }, [])

    return (
        <div>
          <OrganizationsComponent Organizations={Organizations}/>
        </div>
      )

}

export async function getServerSideProps() {
    const fetchOrgs = async () => {
        let { data: Organizations, error } = await supabase
            .from('Organizations')
            .select('*')
            .order('id', { ascending: true})
        return Organizations
    }

    const Organizations = await fetchOrgs();

    return { props: { Organizations } }
}




