import React from 'react'
import styles from '../styles/Form.module.css'
import { useState,useEffect } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import Link from 'next/link'
import { useRouter } from 'next/router'

function login() {
    const router = useRouter()
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            router.push('/profile')
        }
    }, []);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    
    const submit = async (e) => {
        e.preventDefault()
        const res = await fetch('https://uatservice.fodxpert.com/auth/local/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: email,
                password: password,
            })

        })
        const data = await res.json()
        console.log(data);
        if (data) {
            sessionStorage.setItem('token', data.jwt)
            router.push('/profile')
        }
        setEmail('');
        setPassword('');
        setShowPassword(false);

    }
    const toggleShowPassword = async (e) => {
        e.preventDefault()
        setShowPassword(!showPassword)

    }
    return (
        <form className={styles.form}>
            <div className={styles.title}>
                Welcome
            </div>
            <div className={styles.subtitle}>
                Sign in to your account!
            </div>
            <div className={`${styles.inputContainer} ${styles.ic1}`}>
                <input id="email"
                    className={styles.input}
                    type="email"
                    placeholder=''
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off'
                />
                <div className={`${styles.cut} ${styles.cutShort}`}></div>
                <label htmlFor="email"
                    className={styles.placeholder}
                >
                    Email
                </label>
            </div>
            <div className={`${styles.inputContainer} ${styles.ic2}`}>
                {showPassword ? <input
                    id="password"
                    className={styles.input}
                    type="text" placeholder=''
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete='off'
                /> :
                    <input
                        id="password"
                        className={styles.input}
                        type="password" placeholder=''
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete='off'
                    />}
                <div className={styles.cut}></div>
                <label htmlFor="password"
                    className={styles.placeholder}>
                    Password
                </label>
                <span onClick={toggleShowPassword} style={{ float: 'right' }}>
                    {showPassword ? <AiFillEyeInvisible size={30} color='#08d' /> : <AiFillEye size={30} color='#08d' />}
                </span>
            </div>
            <button
                type="text"
                className={styles.submit}
                disabled={!email || !password}
                onClick={submit}>
                Submit
            </button>
            <Link href='/forgotpassword'>
        Forgot Password?
      </Link>
           
        </form>
    )
}

export default login