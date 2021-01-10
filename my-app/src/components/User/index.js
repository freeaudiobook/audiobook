import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../contexts'

import { getCurrentUser } from '../../utils/api'
import { handlePromise } from '../../utils/promises'

import './style.css'

function User(){

    const { user, setUser } = useContext(GlobalContext)

    const nameFromEmail = user.substring(0, user.lastIndexOf("@"))

    useEffect(() => {
        const func = async() => {
            const [response, err] = await handlePromise(getCurrentUser())
            
            // setUser("example@abcd.com")

            if(err){
                console.log(err)
                return
            }

            console.log(response.data)
            setUser(response.data)
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