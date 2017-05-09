import React, { Component } from 'react';
import './App.css';

import Messenger from './components/Messenger';
import Auth from './components/Auth';

import _ from 'lodash';

class App extends Component {

  constructor() {
    super();

    this.state = {
      user: undefined
    }

    this.updateUser = this.updateUser.bind(this);

  }

  updateUser(user) {
    this.setState({user});
  }

  isAuthenticated() {
    return !_.isNil(this.state.user);
  }

  render() {
    if (this.isAuthenticated()) {
        return <Messenger user={this.state.user}/>;
    }

    return <Auth updateUser={this.updateUser} />;
  }
}

export default App;
