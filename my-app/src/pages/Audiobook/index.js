import React, { useContext } from 'react'

import { GlobalContext } from '../../contexts'

import './style.css'

function Audiobook(){

    const { setCurrentAudio } = useContext(GlobalContext)

    let title = "A Tale of Two Cities"
    let author = "William Shakespeare"
    let chapters = [
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

    const updateCurrentAudio = (chapter) => setCurrentAudio(
        {
            bookTitle: title,
            chapter,
            url: "http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3"
        }
    )

    return (
        <div className="audiobook-page">
            <h1>
                {title}
            </h1>
            <h3 className="author">
                By {author}
            </h3>
            <br/>
            <h3>Chapters</h3>
            <div className="chapters">
                {
                    chapters.map((chapter, index) => 
                        <div 
                            className="chapter"
                            onClick={() => updateCurrentAudio(chapter)}
                        >
                            <h4>{chapter.name}</h4>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Audiobook