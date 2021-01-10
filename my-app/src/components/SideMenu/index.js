import React from 'react'

import { BsSearch, BsFillHouseDoorFill } from 'react-icons/bs';

import './style.css'

function SideMenu({ history, location }) {

    const isSelected = (path) => location.pathname === path

    return (
        <div className="side-menu">
            <div className="logo-and-name">
                <img 
                    src="/assets/new-logo.svg"
                    className="logo"
                />
                <h3 className="org-name">The Book Hub</h3>
            </div>
            <div className="actions">
                <div 
                    className="action" 
                    onClick={() => history.push("/")}
                    data-is-selected={isSelected("/")}
                >
                       <BsFillHouseDoorFill size={"20px"}/> 
                       <span class="text">
                            Home
                       </span>
                    </div>
                <div 
                    className="action"
                    onClick={() => history.push("/search")}
                    data-is-selected={isSelected("/search")}
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