import React, { useContext, useEffect } from 'react'

import { GlobalContext } from '../../contexts'

import './style.css'

function Player(){

    const { currentAudio } = useContext(GlobalContext)

    useEffect(() => {
        console.log(currentAudio)
    }, [currentAudio])

    console.log("Rerendered")

    return (
        <div className="player">
            {currentAudio.chapter?.name || "No song selected yet"}
            {
                currentAudio.chapter?.name
                &&
                <audio src="http://www.archive.org/download/history_of_astronomy_2101_librivox/historyofastronomy_00_bryant_128kb.mp3" controls>
                    Your browser does not support the audio element.
                </audio>
            }
        </div>
    )
}

export default Player