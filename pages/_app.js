import Layout from '../layouts/layout'
import '../styles/globals.css'
import Link from 'next/link'

import { initHashconnect } from '../utils/hashconnectService';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    initHashconnect();
  },[])

  return(
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default MyApp
