import React from 'react'

function ProjectsSingle({ project, solution, organization }) {
  return (
    <div>
    <section class="py-20 xl:pt-24 xl:pb-28 bg-white">
  <div class="container px-4 mx-auto">
    <div class="flex flex-wrap -mx-4">
      <div class="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
      <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=572&q=80" alt=""/>
      <h5 class="text-gray-900 text-xl py-5 font-medium mb-2">{solution[0].name} in {project[0].country}</h5>
      <h5 class="text-gray-900 text-xl font-medium mb-2">Budget: ${project[0].budget_usd}</h5>
      <h5 class="text-gray-900 text-xl font-medium mb-2">Country: {project[0].country}</h5>
      <h5 class="text-gray-900 text-xl font-medium mb-2">Duration: {project[0].project_duration_days}</h5>
      <h5 class="text-gray-900 text-xl font-medium mb-2">Status: {project[0].status}</h5>
      <h5 class="text-gray-900 text-xl font-medium mb-2">Organization Wallet ID: {organization[0].wallet_address}</h5>
      <h5 class="text-gray-900 text-xl font-medium mb-2">Amount Donated:</h5>
      <p class="text-gray-700 text-base mb-2"> Description of the project and what project is about </p>
      
        <div class="mb-5">
            <input type="text" id="amount" name="amount" placeholder="Enter an amount." class="border border-gray-300 shadow p-3 w-full rounded"/>
        </div>
        <button class="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg">Donate</button>
    </div>
    
    </div>
  </div>
</section>
    
     </div>
  )
}

export default ProjectsSingle