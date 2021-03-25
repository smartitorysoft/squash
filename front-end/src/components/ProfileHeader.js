import { AppBar, Tabs, Tab } from '@material-ui/core'
import React from 'react'
import { ProfileDetails } from './ProfileDetails'
import TabPanel from './TabPanel'

export const ProfileHeader = () => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div>
            <AppBar position='static'>
                <Tabs  value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label='Foglalásaim'/>
                    <Tab label='Tranzakciók'/>
                    <Tab label='Személyes adatok'/>
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                Foglalásaim
            </TabPanel>
            <TabPanel value={value} index={1}>
                Tranzakciók
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProfileDetails/>
            </TabPanel>
        </div>
    )
}

export default ProfileHeader
