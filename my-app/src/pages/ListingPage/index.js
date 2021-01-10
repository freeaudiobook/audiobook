import React from 'react'

import Audiobook from '../../components/Audiobook'

import './style.css'

function ListingPage({ history }){
    document.title = "Discover Audiobooks | The Book Hub"

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

    return (
        <div className="listing-page rest-page">
            <div className="group">
                <h2 className="heading discover">Discover</h2>
                <div className="items audiobooks">
                {
                        audiobooks.map(
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