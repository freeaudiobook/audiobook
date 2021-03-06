import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SideMenu from './components/SideMenu'
import Player from './components/Player'
import User from './components/User'

import GenreAudiobooks from './pages/GenreAudiobooks'
import ListingPage from './pages/ListingPage'
import Audiobook from './pages/Audiobook'
import Search from './pages/Search'

import { GlobalContext } from './contexts'

import './App.css';

function App() {

  const [currentAudio, setCurrentAudio] = useState({})
  const [user, setUser] = useState("")

  const contextValue = {
    currentAudio, setCurrentAudio,
    user, setUser
  }

  return (
    <div className="main-container" data-show-player={Boolean(currentAudio?.chapter?.Link)}>
      <BrowserRouter>
        <Switch>
          <GlobalContext.Provider value={contextValue}>
            <Route path="/" component={SideMenu} />
            <Route exact path="/genre/:genre" component={GenreAudiobooks} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/audiobook/" component={Audiobook} />
            <Route exact path="/audiobook/:id" component={Audiobook} />
            <Route exact path="/" component={ListingPage} />
            <Route path="/" component={Player} />
          </GlobalContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
