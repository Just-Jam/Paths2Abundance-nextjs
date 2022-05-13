import Link from 'next/link';
import { supabase } from '../utils/client';
import { getBalance, saveData } from '../utils/hashconnectService';

export default function Test() {
    
    return (
        <div>
            <li>
                <Link href="/">
                    Home Page
                </Link>
            </li>
            <h1>Test Page</h1>
            <button onClick={() => console.log(saveData)}>Get saveData</button>
            <button onClick={getBalance}>Get balance</button>
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