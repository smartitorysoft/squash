
import Head from 'next/head'
import TextInput from '../src/components/TextInput'
import styles from '../styles/Home.module.css'
import React from 'react'
import { HomeHeader } from '../src/components/HomeHeader'

export default function Home() {

  return (
    <div className={styles.container}>
      <HomeHeader/>
    </div>
  )
}
