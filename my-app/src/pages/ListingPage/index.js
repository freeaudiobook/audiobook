import React, { useContext, useEffect, useState } from 'react'

import Audiobook from '../../components/Audiobook'
import { listAllBooks } from '../../utils/api'

import './style.css'

function ListingPage({ history }){
    document.title = "Discover Audiobooks | The Book Hub"

    const [items, setItems] = useState([])
    const [pageLoaded, setPageLoaded] = useState(false)

    useEffect(() => {
        const func = async() => {
            const response = await listAllBooks()
            setPageLoaded(true)
            if(response.status !== 200){
                return
            }
            setItems(response.data.books)
        }
        func()
    }, [])

    return (
        <div className="listing-page rest-page">
            {
                pageLoaded 
                && 
                <div className="group">
                    <h2 className="heading discover">Discover</h2>
                    <div className="items audiobooks">
                    {
                        items.map(
                            audiobook => 
                                <Audiobook {...audiobook} history={history} />
                        )
                    }
                    </div>
                </div>
            }
        </div>
    )
}

export default ListingPage