import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../contexts'

import { getCurrentUser } from '../../utils/api'

import './style.css'

function User(){

    const { user, setUser } = useContext(GlobalContext)

    const nameFromEmail = user.substring(0, user.lastIndexOf("@"))

    useEffect(() => {
        const func = async() => {
            // const response = await getCurrentUser()
            // if(response?.data?.status === 200){
            //     setUser(response.data)
            // }
            setUser("harsh51000@gmail.com")
        }
        func()
    }, [])

    return (
        <div className="user">
            {
                !user
                &&
                <div 
                    className="login-btn user-btn"
                    onClick={() => window.location = "/auth/google"}
                >
                    Login via Google
                </div>
            }
            {
                user
                &&
                <div 
                    className="login-btn user-btn"
                >
                    {nameFromEmail}
                </div>
            }
        </div>
    )
}

export default User