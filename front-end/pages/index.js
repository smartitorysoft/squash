
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React from 'react'
import { HomeHeader } from '../src/components/HomeHeader/HomeHeader'
import { getAppointments } from '../store/appointments/actions'
import { useSelector } from 'react-redux'
import { Store } from '@material-ui/icons'

function Home() {

  return (
    <div className={styles.container}>
      <HomeHeader/>
    </div>
  )
}

Home.getInitialProps = async (ctx) => {
  console.log("getInitialProps");
 await ctx.store.dispatch(getAppointments())
 console.log("getInitialProps after dispatch");
  // const appointments = useSelector(state => state.appointments.appointments)
  return {lorem:'ipsum'}
}

export default Home