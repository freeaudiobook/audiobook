import React, { useContext, useEffect, useState } from 'react'

import Audiobook from '../../components/Audiobook'
import { listAllBooks } from '../../utils/api'

import './style.css'

function ListingPage({ history }){
    document.title = "Discover Audiobooks | The Book Hub"

    const [items, setItems] = useState([])

    const audiobooks = [
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        },
        {
            imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
            title: "A Tale of Two Cities",
            author: "William Shakespeare"
        }
    ]

    useEffect(() => {
        // const response = await listAllBooks()
        // if(response.status !== 200){
        //     return
        // }
        // setItems(response.data)
        setItems(audiobooks)
    }, [])

    return (
        <div className="listing-page rest-page">
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
        </div>
    )
}

export default ListingPage