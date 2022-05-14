import Navbar from '../components/Navbar'
import { initHashconnect } from '../utils/hashconnectService';

import React, { useState } from 'react';


import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { navLinks } from '../utils/data';
import { Link , animateScroll as scroll, scroller} from 'react-scroll'

export default function Layout({ children }) {
    return (
        <>
        
          <Navbar initHashconnect={initHashconnect} />

          <main>{children}</main>
        </>
      )
}


{/* <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/projects">
          <a>Projects</a>
        </Link>
        <Link href="/solutions">
          <a>Solutions</a>
        </Link>
        <Link href="/organizations">
          <a>Organizations</a>
        </Link>
        <Link href="/hbar">
          <a>HBAR Crypto</a>
        </Link>
      </nav> */}