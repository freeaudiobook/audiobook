import React, { useEffect } from 'react'

import { getCurrentUser } from '../../utils/api'

import './style.css'

function User(){

    useEffect(() => {
        const func = async() => {
            const response = await getCurrentUser()
            console.log(response.data)
        }
        func()
    }, [])

    return (
        <div className="user">
            <div 
                className="login-btn"
                onClick={() => window.location = "/auth/google"}
            >
                Login via Google
            </div>
        </div>
    )
}

export default User