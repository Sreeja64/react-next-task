import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

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
        const res = await fetch('https://uatservice.fodxpert.com/users/me', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const user = await res.json();
        setUser(user)
      }
    }
    fetchUser()
  }, []);

//console.log(user);
  return (
    <div>
      <ul type="none">
        <li>Name: {user.name}</li>
        <li>Username : {user.username}</li>
        <li>Email : {user.email}</li>
        <li>Confirmed : {user.confirmed?'true':'false'}</li>
        <li>Status : {user.status}</li>
      </ul>
    </div>
  )
}

export default profile