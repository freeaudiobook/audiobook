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
        imgUrl: "https://img.jakpost.net/c/2019/03/02/2019_03_02_66706_1551461528._large.jpg",
        chapters: [
            {
                name: "Chapter 1",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 2",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 3",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 4",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 5",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 6",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 7",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 8",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            },
            {
                name: "Chapter 9",
                url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
            }
        ]
    })

    const updateCurrentAudio = (chapter) => setCurrentAudio(
        {
            bookTitle: audiobook.title,
            chapter
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
                <div className="bg-img" style={{ background: `url("${audiobook.imgUrl}")` }}/> 
                <div className="cover-art">
                    <img 
                    src={audiobook.imgUrl}
                    />
                </div>
                <div className="name-and-author">
                    <h1 className="title">
                        {audiobook.title}
                    </h1>
                    <h3 className="author">
                        By {audiobook.author}
                    </h3>
                </div>
            </div>
            <br/>
            <h3>Chapters</h3>
            <div className="chapters">
                {
                    audiobook.chapters.map((chapter, _) => 
                        <div 
                            className="chapter"
                            onClick={() => updateCurrentAudio(chapter)}
                        >
                            <img src={audiobook.imgUrl}/>
                            <h4>{chapter.name}</h4>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Audiobook