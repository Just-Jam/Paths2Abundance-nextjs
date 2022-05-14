import Link from 'next/link';
import { supabase } from '../utils/client';
import { Hbar } from '@hashgraph/sdk';

export default function Test() {


    const HbarToTinybar = (amount) =>{
        const tinyBars = new Hbar(amount).toTinybars();
        return tinyBars.toNumber()
    }
    
    return (
        <div>
            <li>
                <Link href="/">
                    Home Page
                </Link>
            </li>
            <h1>Test Page</h1>
            <h2>tinyBars per HBAR = {HbarToTinybar(1)}</h2>
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