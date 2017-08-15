import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();

    const config = {
      // Your Firebase config info
    };

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e){
    e.preventDefault();

    // Write to Firebase

    this.setState({messageContent: ''})
  }

  handleChange(e){
    this.setState({messageContent: e.target.value})
  }

  render() {
    return (
      <div className="App">


        <form name="message" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.messageContent} onChange={this.handleChange}/>
          <input type="submit"  value="Send" />
        </form>
      </div>

    );
  }
}

export default App;
