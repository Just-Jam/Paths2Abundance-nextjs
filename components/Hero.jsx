import React from 'react'
<<<<<<< HEAD

=======
>>>>>>> bcd77b2125be824a87ef9bfac01a667bdf60ca84
import Image from 'next/image'
import bgImg from '../public/herombg.gif'

const Hero = () => {
  return (
    <div name='home' className='w-full h-screen bg-zinc-200 flex flex-col justify-between'>
        <div className='grid md:grid-cols-2 max-w-[1240px] m-auto'>
            <div className='flex flex-col justify-center md:items-start w-full px-2 py-8'>
                <p className='text-2xl'>A global <b>charity</b> platform</p>
                <h1 className='py-3 text-5xl md:text-7xl font-bold'>Paths2 <br/>Abundance</h1>
                <p className='text-2xl'>Help communities help themselves</p>
                <p className='text-2xl'>through <b>frugal innovations</b></p>
                <button className='py-3 px-6 sm:w-[60%] my-4'>Make a Donation</button>
            </div>
            <div>
              <Image className='w-full' src={bgImg} />
            </div>
        </div>
    </div>
  )
}

export default Hero