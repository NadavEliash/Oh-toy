import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { userService } from '../services/user.service.js'
import { LoginSignup } from './login-signup.jsx'
import { store } from '../store/store.js'


export function AppHeader() {
    const user = useSelector((storeState) => storeState.user)
    const dispatch = useDispatch()

    useEffect(() => {
        loadLoggedUser()
    }, [])

    function loadLoggedUser() {
        const loggedUser = userService.getLoggedinUser()
        store.dispatch({ type: 'SET_USER', user: loggedUser })
    }

    return (
        <section className="app-header">
            <div className="greet-user">
                {/* <h2>Hello {user ? user.fullname : ''}</h2> */}
                <h1>Mister Toy</h1>
            </div>
            {/* <LoginSignup /> */}
        </section>
    )
}