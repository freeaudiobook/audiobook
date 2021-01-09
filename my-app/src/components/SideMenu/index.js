import React, { useContext, useState } from 'react'
import createHistory from 'history/createBrowserHistory'

import { GlobalContext } from '../../contexts';

import './style.css'

function SideMenu({ }) {

    const { history } = useContext(GlobalContext)

    // const history = createHistory();

    const [selectedPage, setSelectedPage] = useState(false)

    return (
        <div className="side-menu">
            <div className="logo-and-name">
                <h3>The Book Hub</h3>
            </div>
            <div className="actions">
                <div 
                    className="action" 
                    onClick={() => history.push("/")}
                >
                        Home
                    </div>
                {/* <div 
                    className="action"
                    onClick={() => history.push("/search")}
                >
                    Search
                </div>
                <div className="action">Your Library</div> */}
            </div>
        </div>
    )
}

export default SideMenu