import React from 'react'
import router from 'next/router'
import Image from 'next/image'
import donorImg from '../public/P2A-Donor.gif'
import orgImg from '../public/P2A-Organization.gif'
import { useEffect, useState } from 'react'
import { getPATHBalance, clearPairings } from "../utils/hashconnectService";

function UserInfoComponent({ saveData, OrgWallets, Projects }) {

    const [profileImg, setProfileImg] = useState(donorImg)
    const [recentProjectsArray, setRecentProjectsArray] = useState([]);

    const ifOrgWallet = () => {
        let x = 0
        for(let i = 0; i < OrgWallets.length; i++) {
            if(saveData.pairedAccounts[0] == OrgWallets[i].wallet_address){
                x++;
            }
        }
        if(x > 0){
            return true
        } else {return false}
        
    }

    const filterProjects = () => {
        for(let i = 0; i < Projects.length; i++) {
            if(saveData.recentDonatedProjects.includes(Projects[i].id)) {
                setRecentProjectsArray([...recentProjectsArray, Projects[i]])
            }
        }
    }

    useEffect(() => {
        if(ifOrgWallet() == true){setProfileImg(orgImg)}
        console.log(Projects)
        filterProjects()
    },[profileImg, ifOrgWallet()])

  return (
    <div className="container mx-auto my-5 p-5">
        <div className="md:flex no-wrap md:-mx-2 ">
           
            <div className="w-full md:w-3/12 md:mx-2">
            
                <div className="bg-white p-3">
                    <div className="image overflow-hidden">
                        <Image className='w-full' src={profileImg} />
                    </div>
                    <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">{saveData.pairedAccounts[0]}</h1>
                    {ifOrgWallet() == true ? (
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">Organization</h3>
                    ) : (
                        <h3 className="text-gray-600 font-lg text-semibold leading-6">Donor</h3>
                    )}
                
                    <ul
                        className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

                        <li className="flex items-center font-medium py-3">
                            <span>PATH Token Balance</span>
                            <span className="ml-auto">{saveData.pathTokenBalance} PATH</span>
                        </li>

                        <li className="flex items-center font-medium py-3">
                            <span>Total Donations</span>
                            <span className="ml-auto">{saveData.pathTokenBalance} HBAR</span>
                        </li>

                        <li className="flex items-center font-medium py-3">
                            <span>Total Projects</span>
                            <span className="ml-auto">1</span>
                        </li>
                        <button onClick={() => getPathTokenBalance()}>Update PATH Balance</button>
                        <button onClick={() => clearPairings()}>Disconnect Wallet</button>

                    </ul>
              </div>
            
            </div>
           
            <div className="w-full md:w-9/12 mx-2 h-64">
              
              <div className="bg-white p-3 shadow-sm rounded-sm">
                    <div className="flex items-center pb-3 space-x-2 font-semibold text-gray-900 leading-8">
                        <span className="tracking-wide">My Recent Donations</span>
                    </div>

                      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <div className="w-full border border-gray-200 rounded-lg shadow-sm">
      
                        {recentProjectsArray.map(project => {
                            return (
                                <div key={project.id} className="w-full border border-gray-200 rounded-lg shadow-sm">
                                    <div className="flex justify-center">
                                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                                            <a href="#!">
                                                <img className="rounded-t-lg" src={project.Solutions.image_file_name} alt="" />
                                            </a>
                                            <div className="p-6">
                                                <h5 className="text-gray-900 text-xl font-medium mb-2">{project.Solutions.name} in {project.country}</h5>
                                                <p className="text-gray-700 text-base mb-2">
                                                    Organized by {project.Organizations.name}
                                                </p>
                                                <div className="px-6 pt-1 pb-2">
                                                    <span className="inline-block bg-slate-100 rounded px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{project.country}</span>
                                                </div>
                                                <p className="text-gray-900 text-l font-small mb-2">Amount to Raise: ${project.budget_usd}</p>
                                                <button type="button" onClick={() => router.push(`/projects/${project.id}`)} className=" inline-block px-20 py-4 bg-transparent text-blue-700 font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-100 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Find Out More</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                      </div>

                      
                    
                  </div>
                </div>
              

                <div className="my-4"></div>

            </div>
        </div>
    </div>
    
  )
}

export default UserInfoComponent