import React, { useContext, useEffect, useState } from 'react'

import Audiobook from '../../components/Audiobook'
import { listAllBooks } from '../../utils/api'

import './style.css'

function ListingPage({ history }){
    document.title = "Curated Audiobooks | The Book Hub"

    const [items, setItems] = useState([])
    const [loaded, setLoaded] = useState(false)

    const genres = [
        "Action & Adventure Fiction",
        "Romance",
        "Horror & Supernatural Fiction",
        "Comedy",
        "Tragedy",
        "General Fiction",
        "Humorous Fiction",
        "Children's Fiction",
        "Plays",
        "Dramatic Readings",
        "Self-Help",
        "Nautical & Marine Fiction",
    ]

    useEffect(() => {
        const func = async() => {
            const response = await listAllBooks()
            setLoaded(true)
            if(response.status !== 200){
                return
            }
            console.log(response.data.books)
            setItems(response.data.books)
        }
        func()
    }, [])

    return (
        <div className="listing-page rest-page">
            <div className="group">
                <h2 className="heading discover">Genres</h2>
                <div className="items audiobooks">
                {
                    genres.map(
                        genre => 
                            <div className="item" onClick={() => history.push(`/genre/${genre}`)}>
                                <h3>{genre}</h3>
                            </div>
                    )
                }
                </div>
            </div>
            <br/>
            {
                loaded 
                && 
                <div className="group">
                    <h2 className="heading discover">Explore</h2>
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
            {
                !loaded
                &&
                <div class="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
        </div>
    )
}

export default ListingPage