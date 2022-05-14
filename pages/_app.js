import Layout from '../components/layout'
import '../styles/globals.css'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return(
    <Layout>
      <Component {...pageProps}/>
    </Layout>
  )
}

export default MyApp
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