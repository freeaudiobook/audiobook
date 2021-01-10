import React from 'react'

import User from '../User'

function WrapperPage({ children }){
    return(
        <div className="rest-page">
            <User/>
            {children}
        </div>
    )
}

export default WrapperPage