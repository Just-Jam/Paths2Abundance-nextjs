import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'


export default function hbar(hbarData){
    console.log(hbarData)
    return (
        <div>
            <h1>Hbar value</h1>
            {hbarData2.map(hbar => {
                return (
                    <li key={organization._id}>
                     {hbar.name}
                    </li>
                )
            })}

        </div>
    )    
}

export async function getServerSideProps() {
    const hbarData = await fetch('https://api.coingecko.com/api/v3/coins/hedera-hashgraph/tickers')
    
    console.log(hbarData)
    const hbarData2 = JSON.parse(JSON.stringify(hbarData))
    console.log(hbarData2)
    return {
        props: {
            hbarData
        }
    }
}