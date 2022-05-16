// import { Input } from 'postcss'
import React from 'react'
// import { Input } from 'postcss'
import Image from 'next/image'
import donorImg from '../public/P2A-Donor.gif'
import orgImg from '../public/P2A-Organization.gif'
import { useEffect, useState } from 'react'

function UserInfoComponent({ saveData, OrgWallets }) {

    const [profileImg, setProfileImg] = useState(donorImg)
    
    const ifOrgWallet = () => {
        let x = 0
        for(let i = 0; i < OrgWallets.length; i++) {
            if(saveData.pairedAccounts[0] == OrgWallets[i].wallet_address){
                x++
            }
        }
        if(x > 0){
            return true
        } else {return false}
        
    }
    useEffect(() => {
        if(ifOrgWallet() == true){setProfileImg(orgImg)}
    },[profileImg, ifOrgWallet])

  return (
    <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
           
            <div class="w-full md:w-3/12 md:mx-2">
            
                <div class="bg-white p-3">
                    <div class="image overflow-hidden">
                        <Image className='w-full' src={profileImg} />
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{saveData.pairedAccounts[0]}</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">Donor/Organization</h3>
                
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">

                        <li class="flex items-center font-medium py-3">
                            <span>PATH Token Balance</span>
                            <span class="ml-auto">{saveData.pathTokenBalance} PATH</span>
                        </li>

                        <li class="flex items-center font-medium py-3">
                            <span>Total Donations</span>
                            <span class="ml-auto">3 HBAR</span>
                        </li>

                        <li class="flex items-center font-medium py-3">
                            <span>Total Projects</span>
                            <span class="ml-auto">3</span>
                        </li>

                    </ul>
              </div>
            
            </div>
           
            <div class="w-full md:w-9/12 mx-2 h-64">
              
              <div class="bg-white p-3 shadow-sm rounded-sm">
                    <div class="flex items-center pb-3 space-x-2 font-semibold text-gray-900 leading-8">
                        <span clas="text-green-500">
                        <img class="h-7 w-full mx-auto"
                            src="https://www.iconpacks.net/icons/4/free-nft-token-icon-13058.png"
                            alt="NFT icon" />
                        </span>
                        <span class="tracking-wide">My NFTs</span>
                    </div>

                      <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                        <div class="w-full border border-gray-200 rounded-lg shadow-sm">
      
                        <div class="flex justify-center">
                            <div class="rounded-lg shadow-lg bg-white max-w-sm">
                                <a href="#!">
                                <img class="rounded-t-lg" src="https://images.unsplash.com/photo-1509099381441-ea3c0cf98b94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80" alt=""/>
                                </a>
                                <div class="p-6">
                                <h5 class="text-gray-900 text-xl font-medium mb-2">Farming project NFT</h5>
                                <p class="text-gray-700 text-base mb-2">
                                    NFT Hash.
                                </p>
                                </div>
                            </div>
                        </div>
                      </div>
                    
                  </div>
                </div>
              

                <div class="my-4"></div>

            </div>
        </div>
    </div>
    
  )
}

export default UserInfoComponent