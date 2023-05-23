
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userService } from '../services/user.service.js'
import { SET_USER } from '../store/store.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, logout, signup } from '../store/user.action.js'

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

export function LoginSignup({ dispatch }) {
    const [credentials, setCredentials] = useState(getEmptyCredentials())
    const [isSignupState, setIsSignupState] = useState(false)

    const loggedUser = useSelector((storeState) => storeState.user)

    useEffect(() => {
        const loggedUser = userService.getLoggedinUser()
        setCredentials({ ...credentials, ...loggedUser })
    }, [])

    function handleCredentialsChange({ target }) {
        const field = target.name
        const value = target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (isSignupState) {
            signup(credentials)
                .then((user) => {
                    showSuccessMsg(`Welcome ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('Oops try again')
                })

        } else {
            login(credentials)
                .then((user) => {
                    showSuccessMsg(`Hi again ${user.fullname}`)
                })
                .catch(err => {
                    showErrorMsg('Oops try again')
                })

        }

    }

    function onLogout() {
        logout()
        setCredentials({ ...credentials, ...getEmptyCredentials() })
    }

    function onToggleSignupState() {
        setIsSignupState(!isSignupState)
    }

    const { username, password, fullname } = credentials

    return (
        <div className="login-page">

            <form className="login-form" onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={handleCredentialsChange}
                    required
                    autoFocus
                />

                <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={handleCredentialsChange}
                    required
                />

                {isSignupState && <input
                    type="text"
                    name="fullname"
                    value={fullname}
                    placeholder="Full name"
                    onChange={handleCredentialsChange}
                    required
                />}

                {(!loggedUser) && <button>{isSignupState ? 'Signup' : 'Login'}</button>}
            </form>
            
            {(loggedUser) && <button onClick={onLogout}>Logout</button>}
            
            <div className="login-btn">
                <a href="#" onClick={onToggleSignupState}>
                    {isSignupState ? 'Already a member? Login' : 'New user? Signup here'}
                </a >
            </div>
        </div >
    )
}