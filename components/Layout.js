import React from 'react'
import Nav from "../components/Nav";
import styles from '../styles/Layout.module.css';
// import Navbar from '../components/Navbar';

export default function Layout({children}) {
  return (
    <>
        <Nav/>
        <div className={styles.container}>
            <main className={styles.main}>
                {children}
            </main>
        </div>
    </>
  )
}
