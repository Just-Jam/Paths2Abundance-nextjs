import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'



export default function Projects({ Projects }){

    useEffect(() => {
        console.log(Projects)
        //console.log(Solutions)
        //console.log(Organizations)
        
    },[])
    return(
        <div>
           
            {Projects.map(project => {
                return (
                    <div key={project._id}>
                    <h1>Start of Project Here:</h1>
                    <h2>{project.solution_id}</h2>
                    <h2>{project.organization_id}</h2>
                    <h2>{project.budget_usd}</h2>
                    <h2>{project.country}</h2>
                    <h2>{project.project_duration_days}</h2>
                    <h2>{project.status}</h2>
                    <h3>Corresponding Solution name Here:</h3>
                    <h2>{project.Solutions.name}</h2>
                    <h1>Corresponding Organizations name Here:</h1>
                    <h2>{project.Organizations.name}</h2>
                    
                    
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
    .select(`*,
    Solutions(name),
    Organizations(name)

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
