
import { useEffect } from 'react'
import axios from 'axios'

function UserProvider({ setCurrentUser }) {

  useEffect(() => {
    const token = window.localStorage.getItem('token')

    if(!token) {
      return
    }
           
    axios.get('/api/auth/me')
      .then(res => {
        setCurrentUser(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }, [setCurrentUser])

  return null
}

export default UserProvider