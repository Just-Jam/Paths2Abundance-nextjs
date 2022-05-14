import React, {useState} from 'react';
import { Link } from 'react-scroll'
import Image from 'next/image'
import logo from '../public/p2a-logo.png'

import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { navLinks } from '../utils/data';


const Navbar = ({ initHashconnect }) => {
  const [nav, setNav] = useState(false)
  const handleClick = () => setNav(!nav)

  const handleClose = () => setNav(!nav)


  return (
    <div className='navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <div className='flex items-center'>
          <div className='w-20'>
          <Image src={logo} />

          </div>
          
          {/* <h1 className='text-3xl font-bold mr-4 sm:text-4xl'>P2A</h1> */}
          <ul className='hidden md:flex'>
          <li><Link to="home" smooth={true} duration={500}>Home</Link></li>
          <li><Link to="solutions" smooth={true} offset={-200} duration={500}>Solutions</Link></li>
          <li><Link to="projects" smooth={true} offset={-50} duration={500}>Projects</Link></li>
          <li><Link to="about" smooth={true} offset={-100} duration={500}>About us</Link></li>
          </ul>
        </div>
        <div className='hidden md:flex pr-4'>
          <button className='px-8 py-3' onClick={initHashconnect}>Connect Wallet</button>
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
          {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}

        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="home" smooth={true} duration={500}>Home</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="solutions" smooth={true} offset={-200} duration={500}>About</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="projects" smooth={true} offset={-50} duration={500}>Support</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="about" smooth={true} offset={-100} duration={500}>Platforms</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="pricing" smooth={true} offset={-50} duration={500}>Pricing</Link></li>

        <div className='flex flex-col my-4'>
          <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4'>Connect Wallet</button>
          <button className='px-8 py-3'>Submit A project</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;