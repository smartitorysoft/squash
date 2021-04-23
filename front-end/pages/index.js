
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

Home.getInitialProps = (ctx) => {
  const date = new Date()
  const formattedDate = [date.getFullYear(), date.getMonth() + 1 < 10 ? '0'+ (date.getMonth() + 1) : date.getMonth(), date.getDate()].join('-')
  console.log(formattedDate);
  ctx.store.dispatch(getAppointments(formattedDate))
  return {lorem:'ipsum'}
}

export default Home