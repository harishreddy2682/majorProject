import React, { useEffect } from 'react'
import Styles from '../styles/Navbar.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useLogout } from '../queryHooks/userHooks'

const Navbar = () => {
    const navigate = useNavigate()
    
    const { mutate: logout, isSuccess: logoutSuccess } = useLogout()

    const logoutHandler = () => {
        logout()
    }

    useEffect(() => {
        if(logoutSuccess) {
            navigate('/')
        }
    }, [logoutSuccess, navigate])

  return (
    <div className={Styles.nav_container}>
        <ul>
            <li><Link to={'/details'}>Details</Link></li>
            <li><Link to={'/profile'}>Update</Link></li>
            <li><Link to={'/details'}>Resume Builder</Link></li>
            <li><Link to={'/details'}>Reccomendation</Link></li>
            <button onClick={logoutHandler}>Logout</button>
        </ul>
    </div>
  )
}

export default Navbar