import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'



export default function Projects({Solutions, Organizations, Projects }){

    useEffect(() => {
        console.log(Projects)
        console.log(Solutions)
        console.log(Organizations)
        
    },[])
    return(
        <div>
            {/* <h1>Projects {Projects[0].id}: </h1>
            <h2>{Projects[0].status}</h2>
            <p>{Projects[0].other_info}</p>
            <p>{Projects[0].solution_id}</p>
            <p>{Projects[0].organization_id}</p>
            <button type="button" onClick={() => router.push('/projects/1')}>
              Projects 1
            </button> */}

            {Projects.map(project => {
                return (
                    <div key={project._id}>
                    <h1>Start of Project Here:</h1>
                    <h2>{project.solution_id}</h2>
                    <h2>{project.organization_id}</h2>
                    <h2>{project.budget_usd}</h2>
                    <h2>{project.country}</h2>
                    
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
    .select(`solution_id,
    organization_id,
    budget_usd,
    country,
    project_duration_days,
    status
    `)

    console.log(Projects)
    return Projects
  }

  // const fetchProjects = async () => {
  //   let { data: Projects, error } = await supabase
  //   .from('Projects')
  //   .select('*')
    
  //   return Projects
  // }
  
  const Organizations =  await fetchOrgs();
  const Solutions =  await fetchSolutions();
  const Projects =  await fetchProjects();
  
  return { props: {Solutions, Organizations, Projects } }
}
