import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";

const getSolution = async (solutionId) => {
    let { data: Solutions, error } = await supabase
    .from('Solutions')
    .select('*')
    .eq('id', solutionId)
    return Solutions
}

export default function Solution({ solutionData }){
    const router = useRouter();
    const { solutionId } = router.query;

    useEffect(() => {
        console.log(solutionData)
    },[])
    return(
        <div>
            <h1>Solution {solutionId}: </h1>
            <h2>{solutionData[0].name}</h2>
            <h3>{solutionData[0].summary}</h3>
        </div>
    )
}

export async function getServerSideProps(context) {

    const solutionData = await getSolution(context.params.solutionId)

    return {
        props: { solutionData }, // will be passed to the page component as props
    }
}
