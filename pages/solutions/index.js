import { useEffect } from "react";
import { supabase } from "../../utils/client";
import SolutionsComponent from "../../components/SolutionsComponent";

export default function Solutions({ Solutions }){

    useEffect(() => {
        console.log(Solutions)
    },[])
    return(
        <div>
            <SolutionsComponent Solutions={Solutions}/>
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