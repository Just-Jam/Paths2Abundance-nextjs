import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";

export default function Projects({ Projects }){

    useEffect(() => {
        console.log(Projects)
    },[])

    return(
        <div>
<<<<<<< HEAD
=======
           
>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
            {Projects.map(project => {
                return (
                    <div key={project.id}>
                      <h1><b>{project.Solutions.name} in {project.country}</b></h1>
                      <h2>Budget USD: {project.budget_usd}</h2>
                      <h2>Duration: {project.project_duration_days} days</h2>
                      <h2>Status: {project.status}</h2>
                      <h2>Organization: {project.Organizations.name}</h2>
                      <h2>Project Id: {project.id}</h2>
                      <button type="button" onClick={() => router.push(`/projects/${project.id}`)}>Donate now</button>
                      <br></br>
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
<<<<<<< HEAD
    .select(`
      id,
      solution_id,
      organization_id,
      budget_usd,
      country,
      project_duration_days,
      status,
      Solutions(name),
      Organizations(name)
=======
    .select(`*,
    Solutions(name),
    Organizations(name)

>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
    `)
    .order('id', { ascending: true})

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
