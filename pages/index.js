import Link from 'next/link'
import { supabase } from '../utils/client'
import { useEffect, useState, useCallback } from 'react';

//components
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Solutions from '../components/Solutions';
import Organizations from '../components/Organizations';
import Projects from '../components/Projects';
import SubmitProject from '../components/SubmitProject';
import SubmitOrganization from '../components/SubmitOrganization';

//import services
import { saveData, appMetadata, initHashconnect } from '../utils/hashconnectService';

export default function Home({ Organizations, Solutions, Projects }) {

  const [addOrg, setAddOrg] = useState({
    name: '',
    website: '',
    country: '',
    active: false,
    description: '',
  });

  const addOrgFunction = async () => {
    if(addOrg.name !== '' && addOrg.website !== '' && addOrg.country !== '' && addOrg.description !== '') {
      await supabase
      .from('Organizations')
      .insert([
        {
          name: addOrg.name,
          website: addOrg.website,
          country: addOrg.country,
          active: true,
          description: addOrg.description
        }
      ])
      console.log(addOrg)
    } else {
      alert('Please fill in all fields')
    }
  }

  useEffect(() => {
    console.log(Organizations)
    console.log(Solutions)
    console.log(Projects)
  },[])

  return (
    <>
    <Hero/>
    </>
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

