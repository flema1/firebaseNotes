import React, { Component } from 'react';

class Message extends Component {
  constructor(){
    super();
    this.removeMessage = this.removeMessage.bind(this);
  }

  removeMessage(){
    this.props.firebaseRef.set(null);
  }

  render(){
    return (
      <div onClick={this.removeMessage}>
        <span className="time">{this.props.message.time}</span>: {this.props.message.content}
      </div>
    )
  }
}

export default Message
