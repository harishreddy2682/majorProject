import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../styles/Register.module.scss'
import { useLogin } from '../queryHooks/userHooks'
import { useQueryClient } from 'react-query'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { mutate: login, isError, error, isSuccess } = useLogin()

    const queryClient = useQueryClient()
    const { status } = queryClient.getQueryState('logged-user')

    const navigate = useNavigate()

    function loginHandler() {
        login({ email, password })
    }

    useEffect(() => {
        if(status === 'success') {
            navigate('/profile')
        }
    }, [status, navigate])

    useEffect(() => {
        if(isSuccess) {
            navigate('/profile')
        }
    }, [isSuccess, navigate])

    return (
        <div className={styles.registerRoot} >
            <div className={styles.form}>
                <h1 className={styles.registerHeading}>Login</h1>
                <div className={styles.inputWrapper}>
                    <p>Email</p>
                    <input type="email" id='email' name='email' value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputWrapper}>
                    <p>Password</p>
                    <input type="password" id='password' name='password' value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                {isError && <p style={{ "color": "red" }}>{error.response.data.msg}</p>}
                {isSuccess && <p style={{ "color": "green" }}>Login Successful</p>}
                <p className={styles.loginLink}>Don't have an account? <Link to='/register'>Register</Link> </p>
                <button onClick={loginHandler}>Login</button>
            </div>
        </div>
    )
}

export default Login