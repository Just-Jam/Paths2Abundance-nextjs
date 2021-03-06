import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SolutionsSingle from "../../components/SolutionsSingle";


const getSolution = async (solutionId) => {
    let { data: solution, error } = await supabase
    .from('Solutions')
    .select('*')
    .eq('id', solutionId)
    return solution
}

export default function Solution({ solution }){
    const router = useRouter();
    const { solutionId } = router.query;

    useEffect(() => {
        console.log(solution)
    },[])
    
    if(solution[0]){
        return (
            <SolutionsSingle solution={solution}/>
        )
    } else {
        return (
            <div> Solution not found </div>
        )
    }
}

export async function getServerSideProps(context) {

    const solution = await getSolution(context.params.solutionId)

    return {
        props: { solution }, // will be passed to the page component as props
    }
}


