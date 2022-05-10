import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { supabase } from '../utils/client'
import { HashConnect } from 'hashconnect'
import { hethers } from '@hashgraph/hethers'
import { useEffect, useState, useCallback } from 'react';
import {createClient} from '@supabase/supabase-js';


export default function Home({ Organizations, Solutions, Projects }) {

  let hashconnect = new HashConnect();

  let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: null,
    pairedAccounts: []
  }

  const appMetadata = {
    name: "Paths2Abundance",
    description: "Paths2Abundance",
    icon: "https://paths2abundance.com/favicon.ico",
  }

  const [addOrg, setAddOrg] = useState({
    name: '',
    website: '',
    country: '',
    active: false,
    description: '',
  });

  const initHashconnect = async () => {
    //first init and store the private for later
    let initData = await hashconnect.init(appMetadata);
    saveData.privateKey = initData.privKey;

    //then connect, storing the new topic for later
    const state = await hashconnect.connect();
    saveData.topic = state.topic;
    
    //generate a pairing string, which you can display and generate a QR code from
    saveData.pairingString = hashconnect.generatePairingString(state, "testnet", true);
    
    //find any supported local wallets
    hashconnect.findLocalWallets();

    console.log("Pairing String: ", saveData.pairingString)
    // console.log("Paired Account: ", saveData.pairedAccounts)
    // console.log("Paired Walletdata: ", saveData.pairedWalletData)
    // console.log("Topic: ", saveData.topic)

    connectToWallet();
  }

  const connectToWallet = async () => {
    hashconnect.pairingEvent.once((pairingData) => {
      //example
      pairingData.accountIds.forEach(id => {
          if(saveData.pairedAccounts.indexOf(id) == -1)
              saveData.pairedAccounts.push(id);
      })
      console.log(pairingData)
      console.log(saveData.pairedAccounts)
    })
    
    
  }

  const getBalance = async () => {
    let HashConnectProvider = hashconnect.getProvider("testnet", saveData.topic, saveData.pairedAccounts[0])
    let balance = await HashConnectProvider.getAccountBalance(saveData.pairedAccounts[0]);
    console.log(balance)
  }

  const addOrgFunction = async () => {
    if(addOrg.name !== '' && addOrg.website !== '' && addOrg.country !== '' && addOrg.description !== '') {
      await supabase
      .from('Organizations')
      .insert([
        {
          name: addOrg.name,
          website: addOrg.website,
          country: addOrg.country,
          active: true,
          description: addOrg.description
        }
      ])
      console.log(addOrg)
    } else {
      alert('Please fill in all fields')
    }
  }

  useEffect(() => {
    let hethersProvider = hethers.getDefaultProvider('testnet');
    console.log(hethersProvider);
  },[])

  return (
    <div>
      Pairing String: {saveData.pairingString}
      <li>
        <Link href="/test">Test Page</Link>
      </li>
      <li>
        <Link href="/solutions">Solutions</Link>
      </li>
      <button onClick={() => initHashconnect()}>Connect Wallet</button>
      <button onClick={() => getBalance()}>Get Balance</button>
      <div>
        <form onSubmit={() => addOrgFunction()}>
          <label>
            Organization Name:
            <input type='text' value={addOrg.name} onChange={(e) => setAddOrg({ ...addOrg, name: e.target.value })} />
          </label>
          <label>
            Organization Website:
            <input type='text' value={addOrg.website} onChange={(e) => setAddOrg({ ...addOrg, website: e.target.value })} />
          </label>
          <label>
            Organization Country:
            <input type='text' value={addOrg.country} onChange={(e) => setAddOrg({ ...addOrg, country: e.target.value })} />
          </label>
          <label>
            Organization Description:
            <input type='text' value={addOrg.description} onChange={(e) => setAddOrg({ ...addOrg, description: e.target.value })} />
          </label>
          <label>
            <input type='submit' value='Submit' />
          </label>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const fetchOrgs = async () => {
    let { data: Organizations, error } = await supabase
    .from('Organizations')
    .select('*')
    return Organizations
  }

  const fetchSolutions = async () => {
    let { data: Solutions, error } = await supabase
    .from('Solutions')
    .select('*')
    return Solutions
  }

  const fetchProjects = async () => {
    let { data: Projects, error } = await supabase
    .from('Projects')
    .select('*')
    return Projects
  }

  const Organizations =  await fetchOrgs();
  const Solutions =  await fetchSolutions();
  const Projects =  await fetchProjects();
  
  return { props: { Organizations, Solutions, Projects } }
}

