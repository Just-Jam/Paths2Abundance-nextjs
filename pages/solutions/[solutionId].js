import { supabase } from "../../utils/client";
import { useRouter } from "next/router";
import { useEffect } from "react";



export async function getStaticPaths() {
    const fetchSolutions = async () => {
        let { data: Solution, error } = await supabase
        .from('Solutions')
        .select('*')
        return Solution
      }
      const Solution =  await fetchSolutions();
      console.log("Here is the solution retrieved")
      console.log(Solution)

      const paths = Solution.map(solution => {
          return {
              params: { solutionId: solution.id.toString() }
          }
      })
      return {
          paths,
          fallback: false
      }
}

export async function getStaticProps(context) {
    const solutionDataId = context.params.solutionId
    console.log("This is Solution Data Id")
    console.log(solutionDataId)

    const fetchSolutionsById = async () => {
        console.log(solutionDataId)
        let { data: SolutionById, error } = await supabase
        .from('Solutions')
        .select('*')
        console.log(SolutionById)
        return SolutionById
      }
      const Solution =  await fetchSolutionsById();
      console.log("Here is the solution retrieved")
      console.log(Solution)

    return {
        props: { SolutionData: Solution }, // will be passed to the page component as props
    }
}

const Details = () => {
    return (
        <div>
            <h1>Details Page</h1>
        </div>
    );
}

export default Details;



// const getSolution = async (solutionId) => {
//     let { data: Solutions, error } = await supabase
//     .from('Solutions')
//     .select('*')
//     .eq('id', solutionId)
//     return Solutions
// }

// export async function getStaticProps(context) {
//     const solutionData = await getSolution(context.params.solutionId)
//     console.log("This is Solution Data")
//     console.log(solutionData)
//     return {
//         props: { solutionData }, // will be passed to the page component as props
//     }
// }


