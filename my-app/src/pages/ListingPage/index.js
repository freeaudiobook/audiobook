import React from 'react'

import './style.css'

function ListingPage({ history }){

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
        <div className="listing-page">
            <div className="group">
                <h2 className="discover">Discover</h2>
                <br/>
                <div className="audiobooks">
                {
                        audiobooks.map(
                            audiobook => 
                                <div className="audiobook" onClick={() => history.push("/audiobook")}>
                                    <img src={audiobook.imgUrl}/>
                                    <h2 className="title">
                                        {audiobook.title}
                                    </h2>
                                    <h3 className="author">
                                        By {audiobook.author}
                                        </h3>
                                </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ListingPage