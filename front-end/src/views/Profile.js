import React from 'react'
import { HomeHeader } from '../components/HomeHeader'
import { ProfileHeader } from '../components/ProfileHeader'
import styles from '../../styles/Profile.module.css'

export const Profile = () => {
    return (
        <div className={styles.size}>
            <ProfileHeader/>
        </div>
    )
}
