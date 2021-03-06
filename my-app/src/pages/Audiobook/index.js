import React, { useContext, useEffect, useState } from 'react'

import { GlobalContext } from '../../contexts'

import WrapperPage from '../../components/WrapperPage';
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
                title: response.data?.bookDetails?.title?.String,
                author: response.data?.bookDetails?.author?.String,
                image_url: response.data?.bookDetails?.image_url?.String,
                chapters: response.data.chapters
            })
        }
        func()

    }, [audiboookId])

    return (
        <WrapperPage>
        <div className="audiobook-page rest-page">
            {
                loaded
                &&
                <>
                    <div className="top" >
                        <div className="bg-img" style={{ background: `url("${audiobook?.image_url}")` }} />
                        <div className="cover-art">
                            <img
                                src={audiobook?.image_url}
                            />
                        </div>
                        <div className="name-and-author">
                            <h1 className="title">
                                {audiobook?.title}
                            </h1>
                            <h3 className="author">
                                By {audiobook?.author}
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
                                    <img src={audiobook?.image_url} />
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
        </WrapperPage>
    )
}

export default Audiobook