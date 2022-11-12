import React from 'react'
import styles from '../styles/Form.module.css'
import { useState,useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

function forgotPassword() {
    const [email, setEmail] = useState('')
    const router = useRouter()
    useEffect(() => {
        const token = sessionStorage.getItem('token')
        if (token) {
            router.push('/profile')
        }
    }, []);
    const submit = async (e) => {
        e.preventDefault()
        const res = await fetch('https://uatservice.fodxpert.com/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
            })
        })
        const data = await res.json()
        setEmail('');
    }

    return (
        <form className={styles.form}>
            <div className={styles.subtitle}>
                Forgot your password?
            </div>
            <div className={`${styles.inputContainer} ${styles.ic1}`}>
                <input id="email"
                    className={styles.input}
                    type="text"
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
            
            <button
                type="text"
                className={styles.submit}
                disabled={!email}
                onClick={submit}>
                Submit
            </button>
            <Link href='/login'>
                Remember Password?
            </Link>
        </form>
    )
}

export default forgotPassword