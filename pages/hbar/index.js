import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'

export default function HbarDisplay({ hbarData }) {

    useEffect(() => {
        console.log(hbarData)
    }, [])

    return (
        <div>
            {hbarData.map(hbar => {
                return (
                    <div key={hbar.target}>
                        <p>{hbar.target}</p>
                        <p>{hbar.last}</p>
                        <p>{hbar.volume}</p>
                        <p>{hbar.trust_score}</p>
                        <p>{hbar.bid_ask_spread_percentage}</p>
                        <p>{hbar.timestamp}</p>
                        <p>{hbar.coin_id}</p>
                        <p>{hbar.target_coin_id}</p>
                    </div>
                )
            })}
        </div>
    )
}


export async function getServerSideProps() {
    const data = await fetch('https://api.coingecko.com/api/v3/coins/hedera-hashgraph/tickers')
    const hbarData = await data.json();

    return {
        props: { hbarData }
    }
}