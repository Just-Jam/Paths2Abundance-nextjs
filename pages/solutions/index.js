import { useEffect } from "react";
import { supabase } from "../../utils/client";
import SolutionsComponent from "../../components/SolutionsComponent";

<<<<<<< HEAD
export default function Solutions({ Solutions }){
=======
export default function Solutions({ Solutions }) {
>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6

    useEffect(() => {
        console.log(Solutions)
    }, [])
    return (
        <div>
<<<<<<< HEAD
            <SolutionsComponent Solutions={Solutions}/>
        </div>
=======
            {Solutions.map(solution => {
                
                return (
                    <div key={solution.id}>
                        <h1>Start of Solution Here:</h1>
                        <button type="button" onClick={() => router.push('/solutions/' + solution.id)}>
                            Solution {solution.id}
                        </button>
                        <h2>{solution.category}</h2>
                        <h2>{solution.nature}</h2>
                        <h2>{solution.summary}</h2>
                        <h2>{solution.estimated_cost_usd}</h2>
                        <h2>{solution.cost_breakdown}</h2>
                        <h2>{solution.information_source}</h2>

                    </div>
                )
            })}

        </div>


>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
    )
}

export async function getServerSideProps() {
<<<<<<< HEAD
  
    const fetchSolutions = async () => {
      let { data: Solutions, error } = await supabase
      .from('Solutions')
      .select('*')
      return Solutions
    }
  
    const Solutions =  await fetchSolutions();
    
    return { props: { Solutions } }
}
=======
    const fetchSolutions = async () => {
        let { data: Solutions, error } = await supabase
            .from('Solutions')
            .select('*')
        return Solutions
    }
    // const fetchOrgs = async () => {
    //   let { data: Organizations, error } = await supabase
    //   .from('Organizations')
    //   .select('*')
    //   return Organizations
    // }

    // const fetchProjects = async () => {
    //   let { data: Projects, error } = await supabase
    //   .from('Projects')
    //   .select('*')
    //   return Projects
    // }


    const Solutions = await fetchSolutions();
    //const Organizations =  await fetchOrgs();
    //const Projects =  await fetchProjects();

    return { props: { Solutions } }
}

>>>>>>> eb3b5df469ad18b9d6c171694d77046cd7d055c6
