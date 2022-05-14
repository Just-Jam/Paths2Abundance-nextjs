import Navbar from '../components/Navbar'
import { initHashconnect } from '../utils/hashconnectService';

export default function Layout({ children }) {
    return (
        <>
          <Navbar initHashconnect={initHashconnect} />
          <main>{children}</main>
        </>
      )
}