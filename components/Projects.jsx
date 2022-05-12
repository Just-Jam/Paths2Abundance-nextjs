import React from 'react'

function Projects() {
  return (
    <div>
        
    <section class="w-full py-12 bg-white lg:py-24">
        <div class="max-w-6xl px-12 mx-auto text-center">
            <div class="space-y-12 md:text-center">
                <div class="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
                    <h2 class="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Latest Projects</h2>
                    <p class="text-xl text-gray-500">Explore and donate directly to your preffered Projects.</p>
                </div>
            </div>
    
            <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

    
                <div class="w-full border border-gray-200 rounded-lg shadow-sm">
    
                    <div class="flex justify-center">
                        <div class="rounded-lg shadow-lg bg-white max-w-sm">
                            <a href="#!">
                            <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" alt=""/>
                            </a>
                            <div class="p-6">
                            <h5 class="text-gray-900 text-xl font-medium mb-2">Farming project</h5>
                            <p class="text-gray-700 text-base mb-2">
                                This is a test description for Farming Solution a brief description of the solution.
                            </p>
                            <div class="px-6 pt-1 pb-2">
                                <span class="inline-block bg-slate-100 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#farming</span>
                                <span class="inline-block bg-slate-100 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#africa</span>
                            </div>
                            <h5 class="text-gray-900 text-xl font-medium mb-2">$3,000</h5>
                            
                            <button type="button" class=" inline-block px-20 py-4 bg-transparent text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Donate now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <button type="button" class=" justify-self-center mt-10 px-20 py-4 bg-transparent  text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View More</button>
            
               
    
        </div>
    </section>
    
     </div>
  )
}

export default Projects