import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import Image from 'next/image'
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import logoAlt from '../public/logoAlt.png'

const Navbar = ({ initHashconnect }) => {
  const [nav, setNav] = useState(false)
  const [buttonText, setButtonText] = useState('Connect Wallet')
  const handleClick = () => setNav(!nav)
  const handleClose = () => setNav(!nav)

  useEffect(() => {

  },[])

  return (
    <div className='navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        <nav>
          <div className='flex items-center'>
            <div className='w-20'>
              <Image src={logoAlt} />
            </div>
            <ul className='hidden md:flex'>
              <li><Link href="/" activeClass="active" spy={true} smooth={true} duration={500}><a>Home</a></Link></li>
              <li><Link href="/solutions" activeClass="active" spy={true} smooth={true} offset={-200} duration={500}><a>Solutions</a></Link></li>
              <li><Link href="/projects" activeClass="active" spy={true} smooth={true} offset={-50} duration={500}><a>Projects</a></Link></li>
              <li><Link href="/organizations" activeClass="active" spy={true} smooth={true} offset={-100} duration={500}><a>Organizations</a></Link></li>
              <li><Link href="/profile" activeClass="active" spy={true} smooth={true} offset={-100} duration={500}><a>Profile</a></Link></li>
            </ul>
          </div>
        </nav>
        <div className='hidden md:flex pr-4'>
          <button className='px-8 py-3' onClick={initHashconnect}>{buttonText}</button>
        </div>
        <div className='md:hidden mr-4' onClick={handleClick}>
          {!nav ? <MenuIcon className='w-5' /> : <XIcon className='w-5' />}

        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-zinc-200 w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="/" smooth={true} duration={500}>Home</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="/solutions" smooth={true} offset={-200} duration={500}>Solutions</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="/projects" smooth={true} offset={-50} duration={500}>Projects</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="/organizations" smooth={true} offset={-100} duration={500}>Organizations</Link></li>
        <li className='border-b-2 border-zinc-300 w-full'><Link onClick={handleClose} href="/profile" smooth={true} offset={-50} duration={500}>Profile</Link></li>
        <div className='flex flex-col my-4'>
          <button className='bg-transparent text-indigo-600 px-8 py-3 mb-4' onClick={initHashconnect}>Connect Wallet</button>
          <button className='px-8 py-3'>Submit A project</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;