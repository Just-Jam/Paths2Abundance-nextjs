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
