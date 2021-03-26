import React from 'react'
import { AppBar, Tabs, Tab } from '@material-ui/core'
import { Profile } from '../views/Profile';
import TabPanel from './TabPanel'
import styles from '../../styles/Header.module.css'

export const HomeHeader = () => {

    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div >
            <AppBar style={{ alignItems:'flex-end'}} position='static'>
                <Tabs  value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label='Home'/>
                    <Tab label='Foglalás'/>
                    <Tab  label='Profil'/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Home
            </TabPanel>
            <TabPanel value={value} index={1}>
                Foglalás
            </TabPanel>
            <TabPanel value={value} index={2}>
                <div className={styles.header}>
                    <div className={styles.div}>
                        <p> Vezetéknév Keresztnév</p>
                        <p>Telefonszám</p>
                        <p>Email</p></div>
                    <div className={styles.div}>
                        <p>Kreditek száma</p>
                        <p>Következő foglalás</p>
                        <p>Kártyaszám</p>
                    </div>

                </div>
                <Profile/>
            </TabPanel>
        </div>
    )
}
