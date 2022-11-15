import React, { useState,useEffect } from 'react'
import styles from '../styles/Form.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const getStaticProps = async () => {
  let res = await fetch('https://uatservice.fodxpert.com/countries')
  const countries = await res.json();
  res = await fetch('https://uatservice.fodxpert.com/states')
  const states = await res.json();
  // console.log(states, countries);

  return {
    props: {
      countries,
      states
    }
  }
}


function register({ states, countries }) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [packageVal, setPackage] = useState('personal')
  const [phone, setPhone] = useState('')
  const [state, setState] = useState('')
  const [referalCode, setReferalCode] = useState('')
  const [country, setCountry] = useState('')
  const router = useRouter()
  useEffect(() => {
    const token = sessionStorage.getItem('token')
    if (token) {
        router.push('/profile')
    }
}, []);
  const submit = async (e) => {
    e.preventDefault()
    const res = await fetch('https://uatapi.fodxpert.com/api/memberRegistration/', {
      method: 'POST', 
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        party_package_type: packageVal,
        name: name,
        company_name: company,
        email: email,
        phone_number: phone,
        referral_code: referalCode,
        state: state,
        country: country,

      })
    })
    const data = await res.json()
    console.log(data);
    if (data) {
      router.push('/login')
    }
    setName('')
    setEmail('')
    setCompany('')
    setPackage('personal')
    setPhone('')
    setState('')
    setReferalCode('')
    setCountry('')
  }

  const toTitleCase= (name) =>{
    name = name.charAt(0).toUpperCase() + name.slice(1);
    return name
  }
  const stateOptions = states.map((state) => {
    return (<option key={state.id} value={state.id}>{toTitleCase(state.name)}</option>)
  })

  const countryOptions = countries.map((country) => {
    return (<option key={country.id} value={country.id}>{toTitleCase(country.name)}</option>)
  })

  const packages = [{ name: 'Corporate', value: 'corporate' }, { name: 'Personal', value: 'personal' }]
  const packageOptions = packages.map((packag) => {
    return (<option key={packag.value} value={packag.value}>{packag.name}</option>)
  })

  return (
    <div className={styles.form}>
      <div className={styles.title}>
        Welcome
      </div>
      <div className={styles.subtitle}>
        Let's create your account!
      </div>
      <div className={`${styles.inputContainer} ${styles.ic1}`}>
        <select
          id="package"
          name="package"
          className={styles.input}
          value={packageVal}
          onChange={(e) => setPackage(e.target.value)}
        >
          {packageOptions}
        </select>
        <div className={`${styles.cut} ${styles.cutLong}`}></div>
        <label htmlFor="package"
          className={styles.placeholder}>
          Party Package</label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <input id="name"
          className={styles.input}
          type="text"
          placeholder=" "
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete='off' />
        <div className={styles.cut}></div>
        <label htmlFor="name"
          className={styles.placeholder}>
          Name
        </label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <input id="company"
          className={styles.input}
          type="text"
          placeholder=" "
          value={company}
          onChange={(e) => {
            setCompany(e.target.value)
          }}
          autoComplete='off' />
        <div className={`${styles.cut} ${styles.cutLong}`}></div>
        <label htmlFor="company"
          className={styles.placeholder}>
          Company Name
        </label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <input id="email"
          className={styles.input}
          type="email"
          placeholder=" "
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          autoComplete='off' />
        <div className={styles.cut}></div>
        <label htmlFor="email"
          className={styles.placeholder}>
          Email
        </label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <input
          id="phone"
          className={styles.input}
          type="text"
          placeholder=" "
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value)
          }} />
        <div className={`${styles.cut} ${styles.cutLong}`}></div>
        <label htmlFor="phone"
          className={styles.placeholder}>
          Phone Number
        </label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <input id="referal"
          className={styles.input}
          type="text"
          placeholder=" "
          value={referalCode}
          onChange={(e) => {
            setReferalCode(e.target.value)
          }} autoComplete='off' />
        <div className={`${styles.cut} ${styles.cutLong}`}></div>
        <label htmlFor="referal"
          className={styles.placeholder}>
          Referal Code
        </label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <select
          id="state"
          name="state"
          className={styles.input}
          value={state}
          onChange={(e) => {
            setState(e.target.value)
          }}
        >
          <option key="" value=""></option>
          {stateOptions}
        </select>
        <div className={styles.cut}></div>
        <label htmlFor="state"
          className={styles.placeholder}>
          State
        </label>
      </div>
      <div className={`${styles.inputContainer} ${styles.ic2}`}>
        <select
          id="country"
          name="country"
          className={styles.input}
          value={country}
          onChange={(e) => {
            setCountry(e.target.value)
          }}
        >
          <option key="" value=""></option>
          {countryOptions}
        </select>
        <div className={styles.cut}></div>
        <label htmlFor="country"
          className={styles.placeholder}>
          Country
        </label>
      </div>
      <button type="text"
        className={styles.submit}
        onClick={submit}
        disabled={!email || !phone || !country || !state || !company || !packageVal || !name}>
        Submit
      </button>
      <Link href='/login'>Already have an account?</Link>
    </div>
  )
}

export default register