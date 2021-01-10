import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';

import Audiobook from '../../components/Audiobook';

import { search } from '../../utils/api'

import './style.css'

function Search({ history, location }){
    document.title = "Search Results | The Book Hub"

    const [searchBarValue, setSearchBarValue] = useState("")
    const [loadedResults, setLoadedResults] = useState(true)
    const [searchResults, setSearchResults] = useState([])

    const onChangeCallback = (e) => {
        setSearchBarValue(e.target.value)
    }

    const onKeyDownCallback = (e) => {
        if(e.key==="Enter") history.push(`search?title=${searchBarValue}`)
    }

    useEffect(() => {
        const func = async() => {
            setLoadedResults(false)
            const qParamsMap = new URLSearchParams(location.search)
            const searchParams = {
                title: qParamsMap.get("title")
            }
            const response = await search(searchParams)
            setSearchResults(response.data)
            setLoadedResults(true)
        } 
        func()
    }, [location]) 

    return (
        <div className="search-page rest-page">
            <div className="search-bar">
                <BsSearch style={{color: "black"}}/>
                <input 
                    placeholder="Search for Audiobooks, Authors, or Readers"
                    onChange={onChangeCallback}
                    onKeyDown={onKeyDownCallback}
                />
            </div>
            {
                searchResults.length !== 0
                &&
                <div className="group">
                <h2 className="heading discover">Audiobooks</h2>
                <br/>
                <div className="items">
                    {
                        searchResults.map(
                            audiobook => <Audiobook {...audiobook} history={history} />
                        )
                    }
                </div>
                
            </div>
            } 
            {
                !loadedResults && searchResults.length === 0
                &&
                <div className="no-results-found">
                    <h3>No results found</h3>
                    <p>Please check the spelling of your words or use different keywords</p>
                </div>
            }
        </div>
    )
}

export default Search