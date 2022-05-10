import { useEffect } from "react";
import { supabase } from "../../utils/client";
import router from "next/router";
import Link from 'next/link'

export default function Projects({Projects }){

    useEffect(() => {
        console.log(Projects)
    },[])
    return(
        <div>
            <h1>Projects {Projects[0].id}: </h1>
            <h2>{Projects[0].status}</h2>
            <h3>{Projects[0].other_info}</h3>
            <button type="button" onClick={() => router.push('/projects/1')}>
              Projects 1
            </button>

            <h1>Projects {Projects[1].id}</h1>
            <h2>{Projects[1].status}</h2>
            <h3>{Projects[1].other_info}</h3>
            <button type="button" onClick={() => router.push('/projects/2')}>
              Projects 2
            </button>

        </div>
    )
}

export async function getServerSideProps() {
  
    const fetchProjects = async () => {
      let { data: Projects, error } = await supabase
      .from('Projects')
      .select('*')
      return Projects
    }

    const Projects =  await fetchProjects();
    
    return { props: {Projects } }
}