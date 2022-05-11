import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'


export default function Projects({Solutions, Organizations, Projects }){

    useEffect(() => {
        console.log(Projects)
    },[])
    return(
        <div>
            <h1>Projects {Projects[0].id}: </h1>
            <h2>{Projects[0].status}</h2>
            <p>{Projects[0].other_info}</p>
            <p>{Projects[0].solution_id}</p>
            <p>{Projects[0].organization_id}</p>
            <button type="button" onClick={() => router.push('/projects/1')}>
              Projects 1
            </button>

            <h1>Projects {Projects[1].id}</h1>
            <h2>{Projects[1].status}</h2>
            <p>{Projects[1].other_info}</p>
            <p>{Projects[1].solution_id}</p>
            <p>{Projects[1].organization_id}</p>
            <button type="button" onClick={() => router.push('/projects/2')}>
              Projects 2
            </button>
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

            <h1>Organizations {Organizations[0].id}: </h1>
            <h2>{Organizations[0].name}</h2>
            <h3>{Organizations[0].country}</h3>
            <button type="button" onClick={() => router.push('/solutions/1')}>
              Organization 1
            </button>

            <h1>Organizations {Organizations[1].id}</h1>
            <h2>{Organizations[1].name}</h2>
            <h3>{Organizations[1].country}</h3>
            <button type="button" onClick={() => router.push('/solutions/2')}>
              Organization 2
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
  
  return { props: {Solutions, Organizations, Projects } }
}
