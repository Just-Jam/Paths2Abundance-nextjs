import Navbar from './Navbar'
import { saveData, appMetadata, initHashconnect } from '../utils/hashconnectService';

export default function Layout({ children }) {
    return (
        <>
          <Navbar initHashconnect={initHashconnect} saveData={saveData}/>
          <main>{children}</main>
        </>
      )
}