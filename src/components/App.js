import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Login from './Login';
import Playlists from './Playlists';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Shuffly</h1>
        </header>
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Login} />
            <Route exact path="/app" component={Playlists} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;