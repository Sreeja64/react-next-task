import React, { useEffect } from 'react'
import styles from '../styles/Nav.module.css'
import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/images/logo.png'
import { CgProfile } from 'react-icons/cg'

export default function Nav() {
    const clearSessionStorage = () => {
        sessionStorage.removeItem('token')
    }
    return (
        <nav className={styles.nav}>
            <Image
                src={logo}
                alt="Logo"
                width={30}
                height={30}
            />
            <ul>
                <li>
                    <Link href='/'>
                        Home
                    </Link>
                </li>
                <li>
                    <Link href='/about'>
                        About
                    </Link>
                </li>

                <li>
                    <Link href='/login'>Sign in</Link>
                </li>
                <li>
                    <Link href='/register'>Sign up</Link>
                </li>

                <li>
                    <Link href='/' onClick={clearSessionStorage}>Sign out</Link>
                </li>
                <li>
                    <Link href='/profile'><CgProfile color='#32B7E8' size={30} /></Link>
                </li>

            </ul>

        </nav>
    )
}
