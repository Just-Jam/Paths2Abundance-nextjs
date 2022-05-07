import { useEffect } from "react";
import { supabase } from "../../utils/client";

export default function Solutions({ Organizations, Solutions, Projects }){

    useEffect(() => {
        console.log(Solutions)
    },[])
    return(
        <div>
            <h1>Solution {Solutions[0].id}: </h1>
            <h2>{Solutions[0].name}</h2>
            <h3>{Solutions[0].summary}</h3>

            <h1>Solution {Solutions[1].id}</h1>
            <h2>{Solutions[1].name}</h2>
            <h3>{Solutions[1].summary}</h3>

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
    
    return { props: { Organizations, Solutions, Projects } }
  }