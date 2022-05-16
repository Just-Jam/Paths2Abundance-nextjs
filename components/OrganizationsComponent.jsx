import React from 'react'
import router from "next/router";

function OrganizationsComponent({ Organizations }) {
    return (
        <div>
            <section className="w-full py-12 bg-white lg:py-24">
                <div className="max-w-6xl px-12 mx-auto text-center">
                    <div className="space-y-12 md:text-center">
                        <div className="max-w-3xl mb-10 space-y-5 sm:mx-auto sm:space-y-4">
                            <h2 className="relative text-4xl font-extrabold tracking-tight sm:text-5xl">Organizations partnered with us</h2>
                            <p className="text-xl text-gray-500">Here are some of our main partners</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        {Organizations.map(organization => {
                            return (
                                <div key={organization.id} className="w-full border border-gray-200 rounded-lg shadow-sm">
                                    <div className="flex justify-center">
                                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                                            <a href="#!">
                                                <img className="rounded-t-lg" src={organization.image_file} alt="" />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">{organization.name}, {organization.country}</h5>
                                                <p className="text-gray-900 text-m font-small mb-2">{organization.other_info}</p>
                                                <button type="button" onClick={() => router.push(`/organizations/${organization.id}`)} className=" inline-block px-20 py-4 bg-transparent text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Find Out More</button>
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

export default OrganizationsComponent