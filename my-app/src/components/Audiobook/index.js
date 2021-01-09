import React, { useContext } from 'react'

import './style.css'

function Audiobook({ imgUrl, title, author, history }) {

    return (
        <div className="item audiobook" onClick={() => history.push("/audiobook")}>
            <img src={imgUrl} />
            <h2 className="title">
                {title}
            </h2>
            <p className="author">
                By {author}
            </p>
        </div>
    )
}

export default Audiobook