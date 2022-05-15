import React from 'react'
import { useState } from 'react'

function OrganizationsSingle({ organization }) {
    return (
        <div>
            <section className="py-20 xl:pt-24 xl:pb-28 bg-white">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-wrap -mx-4">
                        <div className="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
                            <img className="rounded-t-lg" src={organization[0].image_file} alt="" />
                            <h5 className="text-gray-900 text-xl py-5 font-medium mb-2">{organization[0].name} in {organization[0].country}</h5>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Status: {organization[0].active}</h5>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Their Website: {organization[0].website}</h5>
                            <h5 className="text-gray-900 text-xl font-medium mb-2">Organization Wallet ID: {organization[0].wallet_address}</h5>
                            <p className="text-gray-700 text-base mb-2"> About the Organizations </p>
                            <div className="mb-5">
                                <p className="text-gray-700 text-base mb-2"> {organization[0].other_info} </p>
                                <p className="text-gray-700 text-base mb-2">Their Website: {organization[0].website}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default OrganizationsSingle