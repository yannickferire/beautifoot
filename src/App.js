/* GENERAL IMPORTS */
import React, { Component } from 'react'
import './App.css'

/* IMPORT COMPONENTS */
import Header from './Header'
import Fixtures from './Fixtures'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <h2>The best place to know wich will be <br/>the most excitings football events today ⚽</h2>
        <Fixtures/>
      </div>
    );
  }
}

export default App;
