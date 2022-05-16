// import { Input } from 'postcss'
import React from 'react'
// import { Input } from 'postcss'

function UserInfo() {
  return (
    <div class="container mx-auto my-5 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">
           
            <div class="w-full md:w-3/12 md:mx-2">
            
                <div class="bg-white p-3">
                    <div class="image overflow-hidden">
                        <img class="h-auto w-full mx-auto"
                            src="https://th.bing.com/th/id/OIP.BkoXurD30qD41Q4pDKvDAAHaGH?pid=ImgDet&rs=1"
                            alt="profileimage" />
                    </div>
                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">Test UserName</h1>
                    <h3 class="text-gray-600 font-lg text-semibold leading-6">User/Oragnization</h3>
                
                    <ul
                        class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              
                        <li class="flex items-center font-medium py-3">
                            <span>Wallet Address</span>
                            <span class="ml-auto">TWVDYD4689Y7</span>
                        </li>

                        <li class="flex items-center font-medium py-3">
                            <span>HBAR Balance</span>
                            <span class="ml-auto">989.736 HBAR</span>
                        </li>

                        <li class="flex items-center font-medium py-3">
                            <span>PATH Balance</span>
                            <span class="ml-auto">98.9 PATH</span>
                        </li>

                        <li class="flex items-center font-medium py-3">
                            <span>Total Donations</span>
                            <span class="ml-auto">3</span>
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

               
                <div class="bg-white p-3 shadow-sm rounded-sm">

                    <div class="grid grid-cols-2">
                        <div>
                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                <span clas="text-green-500">
                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </span>
                                <span class="tracking-wide">Transactions</span>
                            </div>
                            <ul class="">
                                <li>
                                    <div class="text-black-600">Contributed to a solution.</div>
                                    <div class="text-gray-500 text-xs">5000 HBAR - 20/05/22</div>
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
  )
}

export default UserInfo