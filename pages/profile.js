import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { CgProfile } from 'react-icons/cg'
import { HiMailOpen } from 'react-icons/hi'
import { BsFillTelephoneFill } from 'react-icons/bs'
import styles from '../styles/Profile.module.css'

function profile() {
  const [user, setUser] = useState({})
  const router = useRouter()
  useEffect(() => {
    async function fetchUser() {
      if (window) {
        const token = sessionStorage.getItem('token')
        if (!token) {
          router.push('/login')
        }
        else {
          let res = await fetch('https://uatservice.fodxpert.com/users/me', {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          })
          const user = await res.json();
          res = await fetch(`https://uatservice.fodxpert.com/users/${user.id}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${token}` }
          })
          const userProfile = await res.json();
          setUser(userProfile)
        }
      }
    }
    fetchUser()
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.profile_info}>
        <div className={styles.profile_name}><CgProfile color='#32B7E8' size={30} />{user.name ? <h3>{user.name}</h3> : null}
        </div>
        <ul type="none">
          <li>
            <HiMailOpen color='#32B7E8' size={20} />
            {user.email ? <span> {user.email} </span> : <span>N/A</span>}
          </li>
          <li>
            <BsFillTelephoneFill color='#32B7E8' size={20} />
            {user.phone_number ? <span>{user.phone_number}</span> : <span>N/A</span>}
          </li>
        </ul>
      </div>
      <ul className={styles.contact_container} type="none">
        {user.party_package_type ? <li>Party Package Type: {user.party_package_type}</li> : <li>Party Package Type: N/A</li>}
        {user.company_name ? <li>Company Name : {user.company_name}</li> : <li>Company Name : N/A</li>}
        {user.state?<li>State : {user.state}</li>:<li>State : N/A</li>}
        {user.country?<li>Country : {user.country}</li>:<li>Country : N/A</li>}
      </ul>
    </div>

  )
}

export default profile

//{"confirmed":false,"blocked":false,"document_type":null,"status":null,"party_package_type":"personal","is_restaurant_partner":false,"temp_password":0,"restaurant_company_owner":false,"is_premium_member":false,"is_deleted":false,"created_wallet":false,"_id":"637234556fae4a11c50ba796","name":"Sreeja","company_name":"INT","username":"EVE997776","email":"sreeja200@yopmail.com","phone_number":"8335837909","uid":"EVE72699421","role":{"_id":"61d59e70519f8937153daca9","name":"Member","description":"Default role given to authenticated user.","type":"authenticated","__v":0,"id":"61d59e70519f8937153daca9"},"event_user_id":5001,"my_refer_code":"D7sm2K","provider":"local","country":{"status":"published","_id":"5fd84b0c7cc7c32258e918bd","name":"india","published_at":"2020-12-15T05:35:11.568Z","createdAt":"2020-12-15T05:35:08.663Z","updatedAt":"2020-12-15T05:35:11.588Z","__v":0,"id":"5fd84b0c7cc7c32258e918bd"},"state":{"status":"published","_id":"60192abe9c645f111052c5aa","name":"goa","published_at":"2021-02-02T10:34:38.275Z","createdAt":"2021-02-02T10:34:38.277Z","updatedAt":"2022-01-31T07:04:32.911Z","__v":0,"country":"5fd84b0c7cc7c32258e918bd","state_code":"GA","state_no":30,"id":"60192abe9c645f111052c5aa"},"createdAt":"2022-11-14T12:28:05.998Z","updatedAt":"2022-11-14T12:28:06.017Z","__v":0,"notifications":[],"read_notifications":[],"id":"637234556fae4a11c50ba796"}