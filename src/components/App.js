import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import Header from './Header';
import Login from './Login';
import Menu from './Menu';
import NotFound from './NotFound';
import getHashParams from '../functions/getHashParams';
import Spotify from 'spotify-web-api-js';

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    this.state = {
      params: getHashParams(),
      query: '',
      user: ''
    };
    if (this.state.params.access_token) {
      spotifyWebApi.setAccessToken(this.state.params.access_token);
    }
  }

  componentDidMount() {
    spotifyWebApi.getMe()
      .then(res => this.setState({ user: res }))
      .catch(err => {
        const response = JSON.parse(err.response);
        console.error(response.error);
      });
  }


  render() {
    return (
      <div className="App">
        <Header user={this.state.user} />
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/app" render={
                (props) => <Menu {...props} params={this.state.params} query={this.state.query} userId={this.state.user ? this.state.user.id : -1} />
              } />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;