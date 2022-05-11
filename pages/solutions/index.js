import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'

export default function Solutions({Solutions }){

    useEffect(() => {
        console.log(Solutions)
    },[])
    return(
        <div>
            <h1>Solution {Solutions[0].id}: </h1>
            <h2>{Solutions[0].name}</h2>
            <h3>{Solutions[0].summary}</h3>
            <button type="button" onClick={() => router.push('/solutions/1')}>
              Solution 1
            </button>

            {Solutions.map(solution => {
                return (
                    <div key={solution._id}>
                    <h1>Start of Solution Here:</h1>
                    <h2>{solution.name}</h2>
                    <h2>{solution.category}</h2>
                    <h2>{solution.nature}</h2>
                    <h2>{solution.summary}</h2>
                    <h2>{solution.estimated_cost_usd}</h2>
                    <h2>{solution.cost_breakdown}</h2>
                    <h2>{solution.information_source}</h2>
                    </div>
                )
            })}
           
        </div>
        
        
    )
}

export async function getServerSideProps() {
    // const fetchOrgs = async () => {
    //   let { data: Organizations, error } = await supabase
    //   .from('Organizations')
    //   .select('*')
    //   return Organizations
    // }
  
    const fetchSolutions = async () => {
      let { data: Solutions, error } = await supabase
      .from('Solutions')
      .select('*')
      return Solutions
    }
  
    // const fetchProjects = async () => {
    //   let { data: Projects, error } = await supabase
    //   .from('Projects')
    //   .select('*')
    //   return Projects
    // }
  
    //const Organizations =  await fetchOrgs();
    const Solutions =  await fetchSolutions();
    //const Projects =  await fetchProjects();
    
    return { props: {Solutions } }
}