import React from 'react'
import { BsSearch } from 'react-icons/bs';

import Audiobook from '../../components/Audiobook';

import './style.css'

function Search({ history }){
    document.title = "Search Results | The Book Hub"

    const audiobooksSearchResults = []

    return (
        <div className="search-page rest-page">
            <div className="search-bar">
                <BsSearch style={{color: "black"}}/>
                <input 
                    placeholder="Search for Audiobooks, Authors, or Readers"
                />
            </div>
            {
                audiobooksSearchResults.length !== 0
                &&
                <div className="group">
                <h2 className="heading discover">Audiobooks</h2>
                <br/>
                <div className="items">
                    {
                        audiobooksSearchResults.map(
                            audiobook => <Audiobook {...audiobook} history={history} />
                        )
                    }
                </div>
                
            </div>
            } 
            {
                audiobooksSearchResults.length === 0
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