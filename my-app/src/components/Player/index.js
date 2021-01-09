import React, { useContext, useEffect } from 'react'
import ReactAudioPlayer  from 'react-h5-audio-player'

import { GlobalContext } from '../../contexts'

import 'react-h5-audio-player/lib/styles.css';
import './style.css'

function Player(){

    const { currentAudio } = useContext(GlobalContext)

    const storeCurrentSeekTime = (currentAudio, currentTime) => {
        console.log(currentAudio, Math.floor(currentTime))
    }

    return (
        <div className="player">
            <div className="current-audio-info">
                <p className="audio-chapter-name">{currentAudio.chapter?.name || ""}</p>
                <p className="title">{currentAudio?.bookTitle || ""}</p>
            </div>
            <div className="audio-player-wrapper">
                {
                    currentAudio.chapter?.name
                    &&
                    <ReactAudioPlayer 
                        src={currentAudio.url} 
                        autoPlay={false} 
                        onListen={(e) => storeCurrentSeekTime(currentAudio, e.target.currentTime)}
                    />
                }
            </div>
        </div>
    )
}

export default Player