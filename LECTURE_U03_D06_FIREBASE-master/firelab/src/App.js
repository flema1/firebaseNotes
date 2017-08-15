import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import * as firebase from 'firebase';


import Message from './components/Message'

class App extends Component {
 constructor(){
       super();
       this.state = {
       num: 0,
  }

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBeOLN7MpCSZ9nvN5KRADGjmQF-3PPv9mg",
        authDomain: "classproject-4d5d5.firebaseapp.com",
        databaseURL: "https://classproject-4d5d5.firebaseio.com",
        projectId: "classproject-4d5d5",
        storageBucket: "classproject-4d5d5.appspot.com",
        messagingSenderId: "753273284644"
      };

        firebase.initializeApp(config);

 this.rootRef = firebase.database().ref();
 this.numRef = this.rootRef.child('num');

 this.handleAdd = this.handleAdd.bind(this);

 }
//this is updating the value on localhost//
//child_added
//child_moved

   componentDidMount() {
     this.numRef.on('child_added', snapshot => {
       this.setState({num: snapshot.val()})//function get called with new update value//
     });

}

    handleAdd(){
     this.numRef.push().set(this.state.num + 1)//randomly generates a kaey

 }

 render() {
   return (
     <div className="App">
       {this.state.num}
       <button onClick={this.handleAdd}>Add</button>
     </div>
   );
 }
}

export default App;