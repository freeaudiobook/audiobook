import React, { useContext, useEffect  } from 'react'
import ReactAudioPlayer  from 'react-h5-audio-player'

import { GlobalContext } from '../../contexts'
import useWindowDimensions from '../../customHooks/useWindowDimensions'

import 'react-h5-audio-player/lib/styles.css';
import './style.css'

function Player(){

    const { currentAudio } = useContext(GlobalContext)
    const { width, height } = useWindowDimensions()

    const storeCurrentSeekTime = (currentAudio, currentTime) => {
        console.log(currentAudio, Math.floor(currentTime))
    }

    return (
        <div className="player">
            <div className="current-audio-info">
                <p className="audio-chapter-name">{currentAudio.chapter?.Title || ""}</p>
                <p className="title">{currentAudio?.bookTitle || ""}</p>
            </div>
            <div className="audio-player-wrapper">
                {
                    currentAudio.chapter?.Title
                    &&
                    <ReactAudioPlayer 
                        src={currentAudio.chapter?.Link} 
                        autoPlay={false} 
                        onListen={(e) => storeCurrentSeekTime(currentAudio, e.target.currentTime)}
                        showJumpControls={width > 450}
                        showSkipControls={width > 450}
                        showFilledVolume={width > 450}
                        showDownloadProgress={width > 450}
                        showFilledProgress={width > 450}
                    />
                }
            </div>
        </div>
    )
}

export default Player