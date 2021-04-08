import React, {useState} from 'react'
import TextInput from '../src/components/TextInput'
import BasicButton from '../src/components/BasicButton'
import styles from '../styles/Register.module.css'
import {useRouter} from 'next/router'
import {register} from '../store/register/actions'
import {useDispatch} from 'react-redux'


export default function Register() {
    const router = useRouter();
    const dispatch = useDispatch()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('')

    const onSubmit = () => {
        dispatch(register({
            email:email,
            password: password,
            profile: {
                firstName:firstName,
                lastName:lastName,
                number:number
            }
        }))
    }

    return (
        <div className={styles.container}>
            <TextInput label='Vezetéknév' onChange={(text) => setLastName(text.target.value)}/>
            <TextInput label='Keresztnév' onChange={(text) => setFirstName(text.target.value)}/>
            <TextInput label='Email cím' onChange={(text) => setEmail(text.target.value)}/>
            <TextInput label='Telefonszám' type="number" onChange={(text) => setNumber(text.target.value)}/>
            <TextInput label='Jelszó' type="password" onChange={(text) => setPassword(text.target.value)}/>
            <TextInput label='Jelszó megerősítése' type="password" onChange={(text) => setPasswordCheck(text.target.value)}/>
            <div className={styles.buttons}>
                <BasicButton label="Regisztrálás" onClick={onSubmit}/>
                <BasicButton label='Vissza' onClick={() => router.back()} />
            </div>
            
        </div>

    )
}
