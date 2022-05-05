import React from 'react'

import bgImg from '../assets/herombg.gif'

const Hero = () => {
  return (
    <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl'>A global charity platform</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Paths2 <br/>Abundance</h1>
                <p className='text-2xl'>Help communities help themselves</p>
                <button className='py-3 px-6 sm:w-[60%] my-4'>Make a Donation</button>
            </div>
            <div>
                <img className='w-full' src={bgImg} alt="/" />
                
            </div>
        </div>
    </div>
  )
}

export default Hero