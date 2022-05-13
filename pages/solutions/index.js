import { useEffect } from "react";
import { supabase } from "../../utils/client";
import SolutionsComponent from "../../components/SolutionsComponent";

export default function Solutions({ Solutions }){

    useEffect(() => {
        console.log(Solutions)
    }, [])

    return (
        <div>
           {Solutions.map(solution => {
                return (
                    <div key={solution._id}>
                        <h1>Start of Solution Here:</h1>
                        <h2>{solution.name}</h2>
                        <h2>{solution.category}</h2>
                    </div>
                )
            })}
        </div>
    )    
}

export async function getServerSideProps() {

    const fetchSolutions = async () => {
      let { data: Solutions, error } = await supabase
      .from('Solutions')
      .select('*')
      return Solutions
    }
  
    const Solutions =  await fetchSolutions();
    
    return { props: { Solutions } }
}


