//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { supabase } from '../utils/client'
import { useEffect, useState, useCallback } from 'react';
//import Hero from '../components/Hero';
//import Navbar from '../components/Navbar';
//import Solutions from '../components/Solutions';
//import Organizations from './components/Organizations';
//import Projects from '../components/Projects';
//import SubmitProject from '../components/SubmitProject';
//import SubmitOrganization from '../components/SubmitOrganuzation';

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
    <div>
      <li>
        <Link href="/test">Test Page</Link>
      </li>
      <li>
        <Link href="/solutions">Solutions</Link>
      </li>
      <button onClick={() => mintOrgNFT()}>Mint OrganizationNFT *Only Sam's address</button>
      <div>
        <form onSubmit={() => addOrgFunction()}>
          <label>
            Organization Name:
            <input type='text' value={addOrg.name} onChange={(e) => setAddOrg({ ...addOrg, name: e.target.value })} />
          </label>
          <label>
            Organization Website:
            <input type='text' value={addOrg.website} onChange={(e) => setAddOrg({ ...addOrg, website: e.target.value })} />
          </label>
          <label>
            Organization Country:
            <input type='text' value={addOrg.country} onChange={(e) => setAddOrg({ ...addOrg, country: e.target.value })} />
          </label>
          <label>
            Organization Description:
            <input type='text' value={addOrg.description} onChange={(e) => setAddOrg({ ...addOrg, description: e.target.value })} />
          </label>
          <label>
            <input type='submit' value='Submit' />
          </label>
        </form>
      </div>
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

