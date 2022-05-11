import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'

export default function Solutions({Solutions, Organizations, Projects }){

    useEffect(() => {
        console.log(Solutions)
        console.log(Projects)
        console.log(Organizations)
    },[])
    return(
        <div>
            <h1>Solution {Solutions[0].id}: </h1>
            <h2>{Solutions[0].name}</h2>
            <h3>{Solutions[0].summary}</h3>
            <button type="button" onClick={() => router.push('/solutions/1')}>
              Solution 1
            </button>

            <h1>Solution {Solutions[1].id}</h1>
            <h2>{Solutions[1].name}</h2>
            <h3>{Solutions[1].summary}</h3>
            <button type="button" onClick={() => router.push('/solutions/2')}>
              Solution 2
            </button>

           
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
  
    const fetchSolutions = async () => {
      let { data: Solutions, error } = await supabase
      .from('Solutions')
      .select('*')
      return Solutions
    }
  
    const fetchProjects = async () => {
      let { data: Projects, error } = await supabase
      .from('Projects')
      .select('*')
      return Projects
    }
  
    const Organizations =  await fetchOrgs();
    const Solutions =  await fetchSolutions();
    const Projects =  await fetchProjects();
    
    return { props: {Solutions } }
}