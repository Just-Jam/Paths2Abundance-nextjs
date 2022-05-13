import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import ProjectsComponent from "../../components/ProjectsComponent";
import { v4 as uuid } from 'uuid'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { useState } from 'react'


const initialState = { solution_id: '', organization_id: '', budget_usd: '',other_info: '',country: '',project_duration_days: '',status: '',date_time_timezone: '' }
export default function Projects({ Projects }) {
  useEffect(() => {
    console.log(Projects)
  }, [])

    const [newProject, setProject] = useState(initialState)

    console.log("User inputed data")
    console.log(newProject)
    const {solution_id, organization_id, budget_usd, other_info, country,project_duration_days,status,date_time_timezone} = newProject

    const router = useRouter()
    function onChange(e) {
      setProject(() => ({ ...newProject, [e.target.name]: e.target.value }))
    }

    async function createNewProject() {
      if (!solution_id || !organization_id || !country) return
      const id = uuid()
      newProject.id = id
      const {data} = await supabase
      .from('Projects')
      .insert([
          { solution_id, organization_id, budget_usd,other_info,country,project_duration_days,status,date_time_timezone }
      ])
    router.push(`/projects/${data.id}`)

    }

  
  return (
    <div>

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

        <label htmlFor="solution_id ">solution_id</label>
        <input onChange={onChange} value={newProject.solution_id} type="text" id="solution_id" name="solution_id" required />

        <label htmlFor="organization_id ">organization_id</label>
        <input onChange={onChange} value={newProject.organization_id} type="text" id="organization_id" name="organization_id" required />

        <label htmlFor="budget_usd ">Last budget_usd</label>
        <input onChange={onChange} value={newProject.budget_usd} type="text" id="budget_usd" name="budget_usd" required />

        <label htmlFor="other_info ">other_info</label>
        <input onChange={onChange} value={newProject.other_info} type="text" id="other_info" name="other_info" required />

        <label htmlFor="country ">country</label>
        <input onChange={onChange} value={newProject.country} type="text" id="country" name="country" required />

        <label htmlFor="project_duration_days ">Project Duration Days</label>
        <input onChange={onChange} value={newProject.project_duration_days} type="text" id="project_duration_days" name="project_duration_days" required />

        <label htmlFor="status ">status</label>
        <input onChange={onChange} value={newProject.status} type="text" id="status" name="status" required />

        <label htmlFor="date_time_timezone ">date_time_timezone</label>
        <input onChange={onChange} value={newProject.date_time_timezone} type="text" id="date_time_timezone" name="date_time_timezone" required />

        <button type="button" onClick={createNewProject} >Submit new project</button>

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



// export function postProject() {
// const postProject = async () => {
  //   const { data, error } = await supabase
  //     .from('Projects')
  //     .insert([
  //       { some_column: 'someValue' },
  //       { some_column: 'otherValue' },
  //     ])
  // }

//   const postNewProject = postProject();
// }