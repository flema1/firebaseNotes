import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import Message from './components/Message'

class App extends Component {
  constructor(){
    super();
    this.state = {
      messages: [],
      messageContent: '',
    };

    const config = {
      //Your firebase config
    };

    firebase.initializeApp(config);

    this.rootRef = firebase.database().ref();
    this.messageRef = this.rootRef.child('messages');

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.messageRef.on('child_added', snapshot => {
      const updatedMessages = [...this.state.messages];
      const newMessage = snapshot.val();
      newMessage.key = snapshot.key;
      updatedMessages.push(newMessage)
      this.setState({
        messages: updatedMessages,
      });
    });

    this.messageRef.on('child_removed', snapshot => {
      const updatedMessages = [...this.state.messages];
      for(let i=0; i < updatedMessages.length; i++){
        if(updatedMessages[i].key === snapshot.key){
          updatedMessages.splice(i,1)
          this.setState({
            messages: updatedMessages,
          })
        }
      }
    });
  }

  handleSubmit(e){
    e.preventDefault();
    const date = new Date();
    this.messageRef.push().set({
      time: date.toTimeString(),
      content: this.state.messageContent
    })

    this.setState({messageContent: ''})
  }

  handleChange(e){
    this.setState({messageContent: e.target.value})
  }

  render() {
    return (
      <div className="App">
        <div>
          {this.state.messages.map(message => {
            return <Message key={message.key} firebaseRef={this.messageRef.child(message.key)} message={message}/>
          })}
        </div>

        <form name="message" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.messageContent} onChange={this.handleChange}/>
          <input type="submit"  value="Send" />
        </form>
      </div>

    );
  }
}

export default App;
