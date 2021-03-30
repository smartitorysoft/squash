import React from 'react'
import TextInput from '../src/components/TextInput'
import BasicButton from '../src/components/BasicButton'
import styles from '../styles/Register.module.css'


export default function register() {
    return (
        <div className={styles.container}>
            <TextInput label='Vezetéknév' />
            <TextInput label='Keresztnév' />
            <TextInput label='Email cím' />
            <TextInput label='Telefonszám' type="number"/>
            <TextInput label='Jelszó' type="password" />
            <TextInput label='Jelszó megerősítése' type="password" />
            <BasicButton label="Regisztrálás" onClick={() => { alert('clicked') }}/>
        </div>

    )
}
