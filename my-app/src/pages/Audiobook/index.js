import React, { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../../contexts'

import { readBook } from '../../utils/api'

import './style.css'

function Audiobook({ match }) {
    document.title = `${"Audiobook"} | The Book Hub`

    const audiboookId = match.params.id

    const { setCurrentAudio } = useContext(GlobalContext)

    const [loaded, setLoaded] = useState(false)
    const [audiobook, setAudiobook] = useState({
        title: "",
        author: "",
        imgUrl: "",
        chapters: []
    })

    const updateCurrentAudio = (chapter) => setCurrentAudio(
        {
            bookTitle: audiobook.title,
            chapter
        }
    )

    useEffect(() => {
        const func = async () => {
            setLoaded(false)
            const response = await readBook(audiboookId)
            setLoaded(true)
            if (response.status !== 200) {
                return
            }
            setAudiobook({
                title: response.data.Title,
                chapters: response.data.Chapters
            })
        }
        func()

    }, [audiboookId])

    return (
        <div className="audiobook-page rest-page">
            {
                loaded
                &&
                <>
                    <div className="top" >
                        <div className="bg-img" style={{ background: `url("${audiobook?.image_url?.String}")` }} />
                        <div className="cover-art">
                            <img
                                src={audiobook?.image_url?.String}
                            />
                        </div>
                        <div className="name-and-author">
                            <h1 className="title">
                                {audiobook?.title?.String}
                            </h1>
                            <h3 className="author">
                                By {audiobook?.author?.String}
                            </h3>
                        </div>
                    </div>
                    <br />
                    <h3>Chapters</h3>
                    <div className="chapters">
                        {
                            (audiobook?.chapters || []).map((chapter, _) =>
                                <div
                                    className="chapter"
                                    onClick={() => updateCurrentAudio(chapter)}
                                >
                                    <img src={audiobook.Link} />
                                    <h4>{chapter.Title}</h4>
                                </div>
                            )
                        }
                    </div>
                </>
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

export default Audiobook