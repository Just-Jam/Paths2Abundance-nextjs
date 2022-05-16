import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import ProjectsComponent from "../../components/ProjectsComponent";
import  {useState}  from 'react'
import  {useRouter}  from 'next/router'

const initialState = { solution_id: '', organization_id: '', budget_usd: '', other_info: '', country: '', project_duration_days: '', status: '' }

export default function Projects({ Projects }) {

  useEffect(() => {
    console.log(Projects)
  }, [])

  const [newProject, setProject] = useState(initialState)
  const router = useRouter()

  const addProjectFunction = async () => {
    console.log("User inputed data")
    console.log(newProject)
    if (!newProject.solution_id !== '' && newProject.organization_id !== '' && newProject.country) {
      await supabase
        .from('Projects')
        .insert([
          {
            solution_id: newProject.solution_id,
            organization_id: newProject.organization_id,
            budget_usd: newProject.budget_usd,
            other_info: newProject.other_info,
            country: newProject.country,
            project_duration_days: newProject.project_duration_days,
            status: newProject.status
          }
        ])
      console.log("Reached here after attempted insert")
      console.log(newProject)
    }
    else {
      alert('Please fill in all fields')
    }
  }

  return (
    <div>
      <ProjectsComponent Projects={Projects}/>
      <form onSubmit={() => addProjectFunction()}>
          <label htmlFor="solution_id ">solution_id</label>
          <input onChange={(e) => setProject({ ...newProject, solution_id: e.target.value })} value={newProject.solution_id} type="text" id="solution_id" name="solution_id" required />

          <label htmlFor="organization_id ">organization_id</label>
          <input onChange={(e) => setProject({ ...newProject, organization_id: e.target.value })} value={newProject.organization_id} type="text" id="organization_id" name="organization_id" required />

          <label htmlFor="budget_usd ">Last budget_usd</label>
          <input onChange={(e) => setProject({ ...newProject, budget_usd: e.target.value })} type="text" id="budget_usd" name="budget_usd" required />

          <label htmlFor="other_info ">other_info</label>
          <input onChange={(e) => setProject({ ...newProject, other_info: e.target.value })} type="text" id="other_info" name="other_info" required />

          <label htmlFor="country ">country</label>
          <input onChange={(e) => setProject({ ...newProject, country: e.target.value })} type="text" id="country" name="country" required />

          <label htmlFor="project_duration_days ">Project Duration Days</label>
          <input onChange={(e) => setProject({ ...newProject, project_duration_days: e.target.value })} type="text" id="project_duration_days" name="project_duration_days" required />

          <label htmlFor="status ">status</label>
          <input onChange={(e) => setProject({ ...newProject, status: e.target.value })} type="text" id="status" name="status" required />

          {/* <label htmlFor="date_time_timezone ">date_time_timezone</label>
      <input onChange={onChange} value={newProject.date_time_timezone} type="text" id="date_time_timezone" name="date_time_timezone" required /> */}

          <label>
            <input type='submit' value='Submit' />
          </label>
        </form>
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
      mintPriceHBAR,
      maxNFTSupply,
      Solutions(name, image_file_name),
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



