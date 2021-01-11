import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../contexts'

import { getCurrentUser } from '../../utils/api'
import { handlePromise } from '../../utils/promises'

import './style.css'

function User(){

    const { user, setUser } = useContext(GlobalContext)

    const nameFromEmail = user.substring(0, user.lastIndexOf("@"))

    function deleteAllCookies() {
        var cookies = document.cookie.split(";");
    
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    const logout = () => {
        deleteAllCookies()
        window.location.reload()
    }

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
                <>
                    <div 
                        className="login-btn user-btn"
                    >
                        {nameFromEmail}
                    </div>
                    <div 
                        className="logout-btn user-btn"
                        onClick={logout}
                    >
                        Logout
                    </div>
                </>
            }
            <br/>
            <br/>
        </div>
    )
}

export default User