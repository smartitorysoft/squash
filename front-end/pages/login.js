import BasicButton from "../src/components/BasicButton";
import TextInput from "../src/components/TextInput";
import styles from '../styles/Login.module.css'
import {useRouter} from 'next/router'
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import {login} from '../store/auth/actions'
import {loadMe} from '../store/me/actions'

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
  
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
  
    const isSignedIn = useSelector(state => state.auth.isSignedIn)

    useEffect(() => {
      if (isSignedIn) {
        dispatch(loadMe());
        router.push('/')
      }
      
    }, [isSignedIn])

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
                router.push('/register')}
                } 
                label='Regisztráció'/>
        </div>
      </div>
    )
}