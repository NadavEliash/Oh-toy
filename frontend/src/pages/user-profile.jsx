import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import { userService } from "../services/user.service.js"

export function UserProfile() {
    const [user, setUser] = useState(null)
    const { userId } = useParams()
    console.log(userId)

    useEffect(() => {
        userService.getUserById(userId)
            .then(setUser)
    }, [userId])



    if (!user || user === undefined) return <div>loading...</div>
    return (
        <section className="user-profile">
            <h1>{user.username}</h1>
            <Link to='/'>Back</Link>
        </section>
    )
}