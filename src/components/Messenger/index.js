import React, {Component} from 'react';
import './messenger.css';

import db from '../../db';

import _ from 'lodash';

export default class Messenger extends Component {

    constructor() {
      super();
      this.state = {
        message: '',
        messages: []
      }
      this.handleMessageChange = this.handleMessageChange.bind(this);
      this.handleMessageSend = this.handleMessageSend.bind(this);
    }

    componentDidMount() {
      let self = this;
      db.ref('messages').on('value', function(snapshot) {
        let messages = _.values(snapshot.val())
                        .map(obj => ({msg: obj.text, user: obj.user}));
        self.setState({messages});
      });
    }

    writeToDatabase(text) {
      let {displayName, photoURL, uid} = this.props.user;

      db.ref('messages').push().set({
        user: {displayName, photoURL, uid},
        text
      });
    }

    handleMessageChange(event) {
      this.setState({message: event.target.value});
    }

    handleMessageSend(event) {
      event.preventDefault();
      this.writeToDatabase(this.state.message);
      this.resetInput();
    }

    resetInput() {
      this.setState({message: ''});
    }

    renderMessageList() {
      return this.state.messages.map(({msg, user}, index) => {
        return (
          <li key={index}>
            <img src={user.photoURL} alt={user.uid}/>
            {user.displayName}:
            {msg}
          </li>
        )
      })
    }

    render() {
      return (
        <div>
          <ul id="messages">
            {this.renderMessageList()}
          </ul>
          <form action="">
            <input value={this.state.message} onChange={this.handleMessageChange} autoComplete="off"/>
            <button onClick={this.handleMessageSend}>Send</button>
          </form>
        </div>
      );
    }
}
