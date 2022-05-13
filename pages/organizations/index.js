import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'
import OrganizationsComponent from "../../components/OrganizationsComponent";

export default function Organizations({ Organizations }) {

    useEffect(() => {
        console.log(Organizations)
    }, [])

    return (
        <div>

            {Organizations.map(organization => {
                return (
                    <div key={organization._id}>
                        <h1>Start of Organization Here:</h1>
                        <h2>{organization.name}</h2>
                        <h2>{organization.website}</h2>
                        <h2>{organization.country}</h2>
                        <h2>{organization.active}</h2>
                        <h2>{organization.other_info}</h2>
                        <h2>{organization.image_file}</h2>
                        <h2>{organization.wallet_address}</h2>
                    </div>
                )
            })}

            {/* <h1>Organizations {Organizations[1].id}</h1>
        <h2>{Organizations[1].name}</h2>
        <h3>{Organizations[1].website}</h3>
        <button type="button" onClick={() => router.push('/organizations/2')}>
        Organizations 2
        </button> */}

        </div>
    )

}

export async function getServerSideProps() {
    const fetchOrgs = async () => {
        let { data: Organizations, error } = await supabase
            .from('Organizations')
            .select('*')
        return Organizations
    }

    // const fetchSolutions = async () => {
    //   let { data: Solutions, error } = await supabase
    //   .from('Solutions')
    //   .select('*')
    //   return Solutions
    // }

    // const fetchProjects = async () => {
    //   let { data: Projects, error } = await supabase
    //   .from('Projects')
    //   .select('*')
    //   return Projects
    // }

    const Organizations = await fetchOrgs();
    //const Solutions =  await fetchSolutions();
    //const Projects =  await fetchProjects();

    return { props: { Organizations } }
}








