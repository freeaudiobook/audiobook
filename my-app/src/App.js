import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SideMenu from './components/SideMenu'
import Player from './components/Player'

import ListingPage from './pages/ListingPage'
import Audiobook from './pages/Audiobook'
import Search from './pages/Search'

import { GlobalContext } from './contexts'

import './App.css';

function App() {
  
  const [currentAudio, setCurrentAudio] = useState({})

  const contextValue = {
    currentAudio, setCurrentAudio
  }

  return (
    <div className="main-container" data-show-player={Boolean(currentAudio?.chapter?.name)}>
      <BrowserRouter basename="/app">
            <Switch>
                <GlobalContext.Provider value={contextValue}>
                  <Route path="/" component={SideMenu} />
                      <Route exact path="/search" component={Search}/>
                      <Route exact path="/audiobook" component={Audiobook}/>
                      <Route exact path="/" component={ListingPage}/>
                    <Route path="/" component={Player} />
                </GlobalContext.Provider>
            </Switch>        
      </BrowserRouter>
    </div>
  );
}

export default App;
