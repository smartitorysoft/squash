import BasicButton from "../src/components/BasicButton";
import TextInput from "../src/components/TextInput";
import styles from '../styles/Login.module.css'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import { useState } from "react";
import {login} from '../store/auth/actions'

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  

    return (
      <div className={styles.container}>
        <div className={styles.fields}>
            <TextInput label='Email cím' onChange={(text) => 
              setEmail(text.target.value)}
              />
            <TextInput label='Jelszó' type='password' onChange={(text) => setPassword(text.target.value)}/>
            </div>
        <div className={styles.buttons}>
            <BasicButton label='Belépés' onClick={() => 
              dispatch(login({
                email: email,
                password: password}))
            }/>
            <BasicButton onClick={() => {
                console.log('clicked');
                router.push('/register')}
                } 
                label='Regisztráció'/>
        </div>
      </div>
    )
}