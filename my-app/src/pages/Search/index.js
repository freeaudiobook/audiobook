import React, { useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs';

import WrapperPage from '../../components/WrapperPage';
import Audiobook from '../../components/Audiobook';

import { search } from '../../utils/api'

import './style.css'

function Search({ history, location }){
    document.title = "Search Results | The Book Hub"

    const [searchBarValue, setSearchBarValue] = useState("")
    const [loadedResults, setLoadedResults] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [keyword, setKeyword] = useState("")

    const onChangeCallback = (e) => {
        setSearchBarValue(e.target.value)
    }

    const onKeyDownCallback = (e) => {
        if(e.key==="Enter") history.push(`search?keyword=${searchBarValue}`)
    }

    const hasSearchedForSomething = keyword !== ""

    useEffect(() => {
        const qParamsMap = new URLSearchParams(location.search)
        const keyword = qParamsMap.get("keyword") || ""
        setKeyword(keyword)
        if(keyword === ""){
            setSearchResults([])
            setLoadedResults(true)
            return
        }
        setSearchBarValue(keyword)
        const func = async() => {
            setLoadedResults(false)
            const searchParams = {
                keyword: keyword
            }
            const response = await search(searchParams)
            setSearchResults(response.data || [])
            setLoadedResults(true)
        } 
        func()
    }, [location]) 

    return (
        <WrapperPage>
        <div className="search-page">
            <div className="search-bar">
                <BsSearch style={{color: "black"}}/>
                <input 
                    placeholder="Search by Title or Author"
                    onChange={onChangeCallback}
                    onKeyDown={onKeyDownCallback}
                    value={searchBarValue}
                />
            </div>
            {
                loadedResults && searchResults.length !== 0
                &&
                <div className="group">
                    <h2 className="heading discover">Audiobooks</h2>
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
                keyword === ""
                &&
                <div className="no-results-found">
                    <h3>Search for an audiobook</h3>
                    <p>Enter the title or the author of the book</p>
                </div>
            }
            {
                hasSearchedForSomething && loadedResults && searchResults.length === 0
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