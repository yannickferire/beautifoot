/* GENERAL IMPORTS */
import React, { Component } from 'react'

import './App.css'

/* IMPORT COMPONENTS */
import Header from './Header'
import Matches from './matches/Matches'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <h2>Tell the world wich are <br/>the best potential football events today ⚽</h2>
        <Matches/>
      </div>
    );
  }
}

export default App;
