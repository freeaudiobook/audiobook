import React, { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../../contexts'

import { readBook } from '../../utils/api'

import './style.css'

function Audiobook({ match }){
    document.title = `${"A Tale of Two Cities"} | The Book Hub`
    
    const audiboookId = match.params.id

    const { setCurrentAudio } = useContext(GlobalContext)

    const [loaded, setLoaded] = useState(false)
    const [audiobook, setAudiobook] = useState({
        title: "A Tale of Two Cities",
        author: "William Shakespeare",
        chapters: [
            {
                name: "Chapter 1",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 2",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 3",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 4",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 5",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 6",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 7",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 8",
                url: "archive.org/chapter1s="
            },
            {
                name: "Chapter 9",
                url: "archive.org/chapter1s="
            }
        ]
    })

    const updateCurrentAudio = (chapter) => setCurrentAudio(
        {
            bookTitle: audiobook.title,
            chapter,
            url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
        }
    )

    useEffect(() => {
        // setLoaded(false)
        // const response = await readBook(audiboookId)
        // if(response.status !== 200){
        //     setLoaded(true)
        //     return
        // }
        // setAudiobook(response.data)
        setLoaded(true)
    }, [audiboookId])

    return (
        <div className="audiobook-page rest-page">
            <div className="top" >
                <div className="bg-img" style={{ background: `url("https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg")` }}/> 
                <div className="cover-art">
                    <img src="https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg"/>
                </div>
                <div className="name-and-author">
                    <h1 className="title">
                        {title}
                    </h1>
                    <h3 className="author">
                        By {author}
                    </h3>
                </div>
            </div>
            <br/>
            <h3>Chapters</h3>
            <div className="chapters">
                {
                    chapters.map((chapter, _) => 
                        <div 
                            className="chapter"
                            onClick={() => updateCurrentAudio(chapter)}
                        >
                            <img src="https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg"/>
                            <h4>{chapter.name}</h4>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Audiobook