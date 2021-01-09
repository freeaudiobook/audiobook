import React, { useContext, useState } from 'react'

import { BsSearch, BsFillHouseDoorFill } from 'react-icons/bs';

import './style.css'

function SideMenu({ history }) {

    // const [selectedPage, setSelectedPage] = useState(false)

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
                       <BsFillHouseDoorFill size={"20px"}/> 
                       <span class="text">
                            Home
                       </span>
                    </div>
                <div 
                    className="action"
                    onClick={() => history.push("/search")}
                >
                    <BsSearch size={"20px"}/> 
                    <span class="text">
                        Search
                    </span>
                </div>
                {/* <div className="action">Your Library</div> */}
            </div>
        </div>
    )
}

export default SideMenu