import React, { useEffect, useState } from 'react'

import WrapperPage from '../../components/WrapperPage';
import Audiobook from '../../components/Audiobook';

import { search } from '../../utils/api'

function Search({ history, match }){
    document.title = "Search Results | The Book Hub"

    const genre = match.params.genre

    const [loadedResults, setLoadedResults] = useState(true)
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const func = async() => {
            setLoadedResults(false)
            const searchParams = {
                genre
            }
            const response = await search(searchParams)
            setSearchResults(response.data || [])
            setLoadedResults(true)
        } 
        func()
    }, [genre]) 

    return (
        <WrapperPage>
        <div className="search-page rest-page">
            <h2>{genre} Audiobooks</h2>
            {
                loadedResults && searchResults.length !== 0
                &&
                <div className="group">
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
                !loadedResults
                &&
                <div class="loading">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            }
            {
                loadedResults && searchResults.length === 0
                &&
                <div className="no-results-found">
                    <h3>No results found</h3>
                    <p>Please check the spelling of your words or use different keywords</p>
                </div>
            }
        </div>
       </WrapperPage>
    )
}

export default Search