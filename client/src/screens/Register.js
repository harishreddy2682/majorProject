import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Register.module.scss'
import { useRegister } from '../queryHooks/userHooks'
import { useQueryClient } from 'react-query'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate: register, isError, error, isSuccess } = useRegister()

    const navigate = useNavigate()

    const queryClient = useQueryClient()
    const { status } = queryClient.getQueryState('logged-user')

    function registerHandler() {
        register({name, email, password})
    }

    useEffect(() => {
        if(status === 'success') {
            navigate('/profile')
        }
    }, [status, navigate])

    useEffect(() => {
        if(isSuccess) {
            navigate('/')
        }
    }, [isSuccess, navigate])

    return (
        <div className={styles.registerRoot} >
            <div className={styles.form}>
                <h1 className={styles.registerHeading}>Register</h1>
                <div className={styles.inputWrapper}>
                    <p>Name</p>
                    <input type="text" id='name' name='name' value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className={styles.inputWrapper}>
                    <p>Email</p>
                    <input type="email" id='username' name='username' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputWrapper}>
                    <p>Password</p>
                    <input type="password" id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {isError && <p style={{"color": "red"}}>{error.response.data.msg}</p>}
                {isSuccess && <p style={{"color": "green"}}>Register Successful</p>}
                <p className={styles.loginLink}>Have an account? <Link to='/'>Login</Link> </p>
                <button onClick={registerHandler}>Register</button>
            </div>
        </div>
    )
}

export default Register