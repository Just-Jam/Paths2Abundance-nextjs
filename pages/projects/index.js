import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import ProjectsComponent from "../../components/ProjectsComponent";

export default function Projects({ Projects }) {

  useEffect(() => {
    console.log(Projects)
  }, [])

  return (
    <div>
      <ProjectsComponent Projects={Projects}/>
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
    `)
      .order('id', { ascending: true })

    console.log(Projects)
    return Projects
  }

  const Organizations = await fetchOrgs();
  const Solutions = await fetchSolutions();
  const Projects = await fetchProjects();

  return { props: { Solutions, Organizations, Projects } }
}



