import React, { useContext } from 'react'

import './style.css'

function Audiobook({ image_url, title, author, book_id, history }) {

    return (
        <div className="item audiobook" onClick={() => history.push(`/audiobook/${book_id}`)}>
            <img src={image_url?.String} />
            <h2 className="title">
                {title?.String}
            </h2>
            <p className="author">
                By {author?.String}
            </p>
        </div>
    )
}

export default Audiobook