import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'

export default function HbarDisplay({ hbarData }) {

    useEffect(() => {
        // console.log("This is the hedera data")
        // console.log(hbarData)
        // console.log("Inside of the hedera data")
        // console.log(hbarData.tickers)
        // console.log("Individual data")
        // console.log(hbarData.tickers[0])
    }, [])

    return (
        <div>
           {hbarData.tickers.map(hbar => {
                return (
                    <div key={hbar}>
                        <h1>Start of new HBAR token Here:</h1>
                        <p>{hbar.base}</p>
                        <p>{hbar.target}</p>
                        <p>HBAR Latest Price: ${hbar.last}</p>
                        <p>HBAR Price converted to btc: ${hbar.converted_last.btc}</p>
                        <p>HBAR Price converted to eth: ${hbar.converted_last.eth}</p>
                        <p>HBAR Price converted to usd: ${hbar.converted_last.usd}</p>
                        <p>HBAR Latest Price: ${hbar.last}</p>
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

{/* <div key={hbarData.target}>
                        <p>{hbarData.target}</p>
                        <p>{hbarData.last}</p>
                        <p>{hbarData.volume}</p>
                        <p>{hbarData.trust_score}</p>
                        <p>{hbarData.bid_ask_spread_percentage}</p>
                        <p>{hbarData.timestamp}</p>
                        <p>{hbarData.coin_id}</p>
                        <p>{hbarData.target_coin_id}</p> */}