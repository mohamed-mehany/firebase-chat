import React, {Component} from 'react';
import firebase from 'firebase';

import './buttons.css';

export default class Auth extends Component {

  constructor() {
    super();

    this.state = {

    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.updateUser(user);
      }
    });
  }

  handleClick() {
    let provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(result => {
      let user = result.user;
      this.props.updateUser(user);
    }).catch(function(error) {
      console.error(error);
    });
  }

  render() {
    return (
      <button className="loginBtn loginBtn--facebook" onClick={this.handleClick}>Login with Facebook</button>
    );
  }
}
