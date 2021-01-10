import React, { useContext, useEffect, useRef  } from 'react'
import ReactAudioPlayer  from 'react-h5-audio-player'

import { GlobalContext } from '../../contexts'
import useWindowDimensions from '../../customHooks/useWindowDimensions'

import { updateSeekTime, getSeek  } from '../../utils/api'

import 'react-h5-audio-player/lib/styles.css';
import './style.css'

function Player(){

    const playerRef = useRef(null);

    const { currentAudio, user } = useContext(GlobalContext)
    const { width, height } = useWindowDimensions()

    const storeCurrentSeekTime = async(currentAudio, currentTime) => {
        // const encodedChapterURL = btoa(currentAudio.chapter?.Link)
        // const currentTimeInSeconds = Math.floor(currentTime)
        // console.log(user, encodedChapterURL, currentTimeInSeconds)
        // const response = await updateSeekTime(user, encodedChapterURL, currentTimeInSeconds)
    }

    useEffect(() => {
        if(!user){
            return
        }
        const func  = async() => {
            // const encodedChapterURL = btoa(currentAudio.chapter?.Link)
            // const response = await getSeek(user, encodedChapterURL)
            // console.log(response.data)
            // if(playerRef?.current?.audio?.current){
            //     playerRef.current.audio.current.currentTime = response.data || 0
            // }
        }
        func()
    }, [currentAudio, user])

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
                        ref={playerRef}
                        src={currentAudio.chapter?.Link} 
                        autoPlay={false} 
                        listenInterval={3000}
                        onListen={(e) => storeCurrentSeekTime(currentAudio, e.target.currentTime)}
                        showJumpControls={width > 450}
                        showSkipControls={width > 450}
                        showFilledVolume={width > 450}
                        showDownloadProgress={width > 450}
                        showFilledProgress={width > 450}
                    />
                }
            </div>
            <div className="dummy"></div>
        </div>
    )
}

export default Player