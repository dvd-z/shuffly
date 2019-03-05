import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Header from './Header';
import Login from './Login';
import NotFound from './NotFound';
import Playlists from './Playlists';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/app" component={Playlists} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;