import React from 'react'
import router from "next/router";

function SolutionsComponent({ Solutions }) {
    return (
        <div>
            <section className="w-full py-12 bg-white lg:py-24">
                <div className="max-w-6xl px-12 mx-auto text-center">
                    <div className="space-y-12 md:text-center">
                        <div className="max-w-3xl mb-20 space-y-5 sm:mx-auto sm:space-y-4">
                            <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Latest Solutions</h2>
                            <p className="text-xl text-gray-500">Explore and donate to your prefered Solutions.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {Solutions.map(solution => {
                        return (
                            <div key={solution.id} className="w-full border border-gray-200 rounded-lg shadow-sm">
                                <div className="flex justify-center">
                                    <div className="rounded-lg shadow-lg bg-white max-w-sm">
                                    <a href="#!">
                                        <img className="rounded-t-lg" src={solution.image_file_name} alt="" />
                                    </a>
                                    <div className="p-6">
                                        <h5 className="text-gray-900 text-xl font-medium mb-2">{solution.name}</h5>
                                        <p className="text-gray-700 text-base mb-2">
                                            {solution.summary}
                                        </p>
                                        <div className="px-6 pt-1 pb-2">
                                            <span className="inline-block bg-slate-100 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{solution.category}</span>
                                            <span className="inline-block bg-slate-100 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{solution.nature}</span>
                                        </div>
                                        
                                        <button type="button" onClick={() => router.push(`/solutions/${solution.id}`)} className=" inline-block px-20 py-4 bg-transparent text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Find Out More</button>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            )
                        })}
                    </div>
                    <button type="button" className=" justify-self-center mt-10 px-20 py-4 bg-transparent  text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">View More</button>
                </div>
            </section>
        </div>
    )
}

export default SolutionsComponent