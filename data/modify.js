const { constants } = require('buffer')
const fs = require('fs')

const data = fs.readFileSync('./data/audiobooks.json')
const audiobooks = JSON.parse(data)

constants

const updatedJSON = audiobooks.data.map(
    audiobook => ({
        ...audiobook,
        imgUrl: `https://thebookhub.org/images/audiobookCovers/${audiobook.id}.jpg`
    })
)

fs.writeFileSync('./data/updateAudiobooks.json', JSON.stringify(updatedJSON, null, 3))