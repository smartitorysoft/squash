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
            <AppBar position='absolute'>
                <Tabs  value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label='Home'/>
                    <Tab label='Foglalás'/>
                    <Tab label='Profil'/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Home
            </TabPanel>
            <TabPanel value={value} index={1}>
                Foglalás
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Profile/>
            </TabPanel>
        </div>
    )
}
