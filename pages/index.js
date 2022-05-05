import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { supabase } from '../utils/client'
import { useEffect, useState } from 'react';

export default function Home() {

  const [orgs, setOrgs] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [projects, setProjects] = useState([]);

  const [addOrg, setAddOrg] = useState({
    name: '',
    website: '',
    country: '',
    active: false,
    description: '',
  });

  const fetchOrgs = async () => {
    let { data: Organizations, error } = await supabase
    .from('Organizations')
    .select('*')
    setOrgs(Organizations)
    console.log(orgs)
  }

  const addOrgFunction = async () => {
    if(addOrg.name !== '' && addOrg.website !== '' && addOrg.country !== '' && addOrg.description !== '') {
      let { data: Organizations, error } = await supabase
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

  const fetchSolutions = async () => {
    let { data: Solutions, error } = await supabase
    .from('Solutions')
    .select('*')
    setSolutions(Solutions)
  }

  const fetchProjects = async () => {
    let { data: Projects, error } = await supabase
    .from('Projects')
    .select('*')
    setProjects(Projects)
  }

  useEffect(() => {
    fetchOrgs();
    fetchSolutions();
    fetchProjects();
  },[])

  return (
    <div>
      Hallo
      <button onClick={() => fetchOrgs()}>Fetch Organizations</button>
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

