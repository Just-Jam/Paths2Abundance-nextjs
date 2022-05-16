import React from 'react'
import { useState } from 'react'

function SolutionsSingle({ solution }) {
    return (
        <div>
            <section className="py-20 xl:pt-24 xl:pb-28 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
                            <img className="rounded-t-lg" src={solution[0].image_file_name} alt="" />
                            <h5 className="text-gray-900 text-xl py-5 font-medium mb-2">{solution[0].name}</h5>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">{solution[0].category}</h5>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">{solution[0].nature}</h5>
                            <div className="mb-5">
                                <h5 className="text-gray-900 text-xl font-medium mb-2">About the Solution</h5>
                                <p className="text-gray-700 text-base mb-2"> {solution[0].summary} </p>
                                <p className="text-gray-700 text-base mb-2">{solution[0].estimated_cost_usd}</p>
                                <p className="text-gray-700 text-base mb-2">{solution[0].cost_breakdown}</p>
                                <p className="text-gray-700 text-base mb-2">{solution[0].information_source}</p>
                                <p className="text-gray-700 text-base mb-2">{solution[0].application_scenarios}</p>
                                <p className="text-gray-700 text-base mb-2">{solution[0].other_info}</p>
                                <p className="text-gray-700 text-base mb-2">{solution[0].applied_by_organizations}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default SolutionsSingle