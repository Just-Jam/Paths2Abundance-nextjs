import Link from 'next/link';
import { supabase } from '../utils/client';
import { Hbar } from '@hashgraph/sdk';
import { useEffect } from 'react';

export default function Test() {


    const HbarToTinybar = (amount) =>{
        const tinyBars = new Hbar(amount).toTinybars();
        return (tinyBars.toNumber())
    }

    const tinyBarToHBAR = (amount) =>{
        const tinyBars = new Hbar(amount).toTinybars();
        return 1/(tinyBars.toNumber())
    }

    useEffect(() => {
        
    },[])
    
    return (
        <div>
            <li>
                <Link href="/">
                    Home Page
                </Link>
            </li>
            <h1>Test Page</h1>
            <h2>tinyBars per HBAR = {HbarToTinybar(1)}</h2>
            <h2>HBAR per tinyBars = {tinyBarToHBAR(1)}</h2>
            <button onClick={() => tinyBarToHBAR(1)}>Click</button>
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
    
    return { props: { Projects } }
}