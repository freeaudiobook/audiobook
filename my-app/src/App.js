import React, { useState } from 'react'
import { BrowserRouter, Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from "history"

import SideMenu from './components/SideMenu'
import Player from './components/Player'

import ListingPage from './pages/ListingPage'
import Audiobook from './pages/Audiobook'

import { GlobalContext } from './contexts'

import './App.css';

function App() {

  const history = createBrowserHistory();
  
  const [currentAudio, setCurrentAudio] = useState({})

  const contextValue = {
    currentAudio, setCurrentAudio, history
  }

  return (
    <div className="main-container">
      <Router history={history}>
        <GlobalContext.Provider value={contextValue}>
          <SideMenu />
          <div className="rest-page">
            <Switch>
              <Route exact path="/audiobook">
                <Audiobook />
              </Route>
              <Route exact path="/" component={ListingPage}/>
            </Switch>
          </div>
          <Player />
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
