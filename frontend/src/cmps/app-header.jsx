import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { LoginSignup } from './login-signup.jsx'
import { store } from '../store/store.js'


export function AppHeader() {
    const user = useSelector((storeState) => storeState.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        loadLoggedUser()
    }, [])

    function loadLoggedUser() {
        const loggedUser = userService.getLoggedinUser()
        store.dispatch({ type: 'SET_USER', user: loggedUser })
    }

    return (
        <section className="app-header">
            <Link to="/">Oh Toy!</Link>

            <nav>
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
            </nav>


            {/* <div className="greet-user">
                <h2>Hello {user ? user.fullname : ''}</h2>
                <LoginSignup />
            </div> */}
        </section>
    )
}