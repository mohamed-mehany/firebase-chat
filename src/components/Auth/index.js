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
    let self = this;
    firebase.auth().onAuthStateChanged(function(user){
      if (user) {
        self.props.updateUser(user);
      }
    });
  }

  handleClick() {
    let self = this;
    let provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result){
      let user = result.user;
      self.props.updateUser(user);
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
