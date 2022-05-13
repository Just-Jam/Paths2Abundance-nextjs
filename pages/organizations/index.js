import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'

export default function Organizations({ Organizations }) {

    useEffect(() => {
        console.log(Organizations)
    }, [])

    return (
        <div>
        
            {Organizations.map(organization => {
                return (
                    <div key={organization._id}>
                    <h1>Start of Solution Here:</h1>
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