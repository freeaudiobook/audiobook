import React, { useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SideMenu from './components/SideMenu'
import Player from './components/Player'

import ListingPage from './pages/ListingPage'
import Audiobook from './pages/Audiobook'

import { GlobalContext } from './contexts'

import './App.css';

function App() {

  const [currentAudio, setCurrentAudio] = useState({})

  const contextValue = {
    currentAudio, setCurrentAudio
  }

  return (
    <div className="main-container">
      <BrowserRouter>
        <GlobalContext.Provider value={contextValue}>
          <SideMenu />
          <div className="rest-page">
            <Switch>
              <Route exact path="/" component={ListingPage}/>
              <Route exact path="/audiobook">
                <Audiobook />
              </Route>
            </Switch>
          </div>
          <Player />
        </GlobalContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
