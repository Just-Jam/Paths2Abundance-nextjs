import React from 'react'
import { useState, useEffect } from 'react'
import { mintProjectNFT, getProjectTotalSupply } from '../utils/hashconnectService'

function ProjectsSingle({ project, solution, organization}) {

  const [mintAmount, setMintAmount] = useState(0)
  const [nftSupply, setNftSupply] = useState(0)

  const getNFTSupply = async () => {
    const supply = await getProjectTotalSupply(project[0].id)
    setNftSupply(supply)
  }

  return (
    <div>
    <section className="py-20 xl:pt-24 xl:pb-28 bg-white">
  <div className="container px-4 mx-auto">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
      <img className="rounded-t-lg" src={solution[0].image_file_name} alt=""/>
      <h5 className="text-gray-900 text-xl py-5 font-medium mb-2">{solution[0].name} in {project[0].country}</h5>
      <h5 className="text-gray-900 text-xl font-medium mb-2">Budget: ${project[0].budget_usd}</h5>
      <h5 className="text-gray-900 text-xl font-medium mb-2">Country: {project[0].country}</h5>
      <h5 className="text-gray-900 text-xl font-medium mb-2">Duration: {project[0].project_duration_days} Days</h5>
      <h5 className="text-gray-900 text-xl font-medium mb-2">Status: {project[0].status}</h5>
      <h5 className="text-gray-900 text-xl font-medium mb-2">Organization Wallet ID: {organization[0].wallet_address}</h5>
      <h5 className="text-gray-900 text-xl font-medium mb-2">Amount Donated:</h5>
      
        <div className="mb-5">
          <h5 className="text-gray-900 text-xl font-medium mb-2">NFT Mint Price: {project[0].mintPriceHBAR} HBAR</h5>
          <h5 className="text-gray-900 text-xl font-medium mb-2">NFT Max Supply: {project[0].maxNFTSupply}</h5>
          <h5 className="text-gray-900 text-xl font-medium mb-2">NFT Current Supply: {nftSupply}</h5>
          <button onClick={() => getNFTSupply()}>Get Latest NFT Supply</button>
          <p className="text-gray-700 text-base mb-2"> Your will receive 1 PATH token for each HBAR donated </p>
            <input id="amount" name="amount" 
            placeholder="NFTs to mint" 
            className="border border-gray-300 shadow p-3 w-full rounded"
            required type="number"
            onChange={(e) => setMintAmount(e.target.value)}/>
        </div>
        <button className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg"
        onClick={() => mintProjectNFT(project[0].id, project[0].mintPriceHBAR, mintAmount)}>Donate</button>
    </div>
    
    </div>
  </div>
</section>
    
     </div>
  )
}

export default ProjectsSingle