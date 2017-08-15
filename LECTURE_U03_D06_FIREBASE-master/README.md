---
title: Firebase
duration: "1:25"
creator:
    name: Drew Mahrt
    city: NYC
---

# ![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png) Firebase


### LEARNING OBJECTIVES
*After this lesson, you will be able to:*
- List components of the Firebase Platform
- Explain how data is stored in Firebase
- Integrate Firebase into your apps

### STUDENT PRE-WORK
*Before this lesson, you should already be able to:*
- Describe the basics of databases

### INSTRUCTOR PREP
*Before this lesson, instructors will need to:*
- Read through the lesson
- Add additional instructor notes as needed
- Edit language or examples to fit your ideas and teaching style
- Open, read, run, and edit (optional) the starter and solution code to ensure it's working and that you agree with how the code was written

---

<a name="opening"></a>
## Opening (5 mins)

Databases can be a crucial part of our websites. The obvious solution would be to host our database on the internet, and access it from the server using something like pg-promise. Firebase provides us with a fast, easy to set up alternative.

> Check: Ask the students if they've heard of Firebase before.

***

<a name="introduction"></a>
## Introduction: What is Firebase (10 mins)

In 2016, Google updated the Firebase platform to include many tools, such as Database, Auth, Cloud Messaging, Analytics, Notifications, Storage, Hosting, Test Lab, Crash Reporting, Remote Config, and Ads. Previously, it was constrained to database and auth purposes. We will be concentrating on the Database portion.

Firebase Database is a quick way to store your app's data on the cloud in a lightly-structured, but very flexible manner. While it holds your data in a database, it is fundamentally different from what we're used to in Postgres.

In Firebase, you don't set up Columns, Data types, keys, etc. ahead of time. You simply add and modify the data on-the-fly. Some of the biggest features of Firebase are how fast it is, and how quickly it can automatically sync the data on your apps. As soon as changes are made online, all apps connected to your Firebase database are notified of the changes, and can update their local data accordingly. This is not just limited to Android, but reflects across all platforms (iOS, web, etc.).

[Let's watch a quick video.](https://www.youtube.com/watch?v=U5aeM5dvUpA&list=PLl-K7zZEsYLmOF_07IayrTntevxtbUxDL&index=12)

> Check: Ask the students to discuss with each other (2 mins) ideas where Firebase could be used.

[Tetris Example](https://youtu.be/SLgHfH7KzXU?t=49s)

***

<a name="demo"></a>
## Demo: Setting Up Firebase (10 mins)

Before we continue setting up our app, let's take a look at the [documentation](https://firebase.google.com/docs/web/setup).  We have the option of using the [REST interface](https://firebase.google.com/docs/database/rest/start), but most people use the [SDK](https://firebase.google.com/docs/database/web/start) which is available for all platforms.

Actually setting up Firebase is extremely simple. After creating a google account, go to the [Firebase website](https://firebase.google.com/).

Click 'Go To Console' in the top right, and create a new project.

Now let's create a new react app, and then `npm install firebase --save`.

> Check: Was everyone able to set it up correctly?

***

<a name="introduction"></a>
## Introduction: Storing Data in Firebase (10 mins)

As we mentioned before, data isn't stored in the same column structure we were used to in Postgres. Let's take a look at some sample data.

> Ask the students what this reminds them of.

This is just like JSON data, with nested data structures of key-value pairs. In fact, we can even export it as a json file.

> Have the students discuss advantages and disadvantages to storing all of the data like this, in JSON form. (3 mins)

This gives us great flexibility in terms of how we store the data, as well as quickly changing the details of the data, but by default we lose a lot of the structure and safety checks associated with a normal relational database. There are ways to set up rules, but it is not very straightforward.

***

<a name="demo"></a>
## Demo: Writing Data (5 mins)

Let's start by writing some simple data to our database.

Before we can start, we need to disable authentication in our database settings.

Now we need to configure our connection to Firebase.

```js
import * as firebase from 'firebase'

const config = {
  apiKey: "yourkey",
  authDomain: "yourdomain.firebaseapp.com",
  databaseURL: "https://yoururl.firebaseio.com",
  projectId: "yourid",
  storageBucket: "yourbucket",
  messagingSenderId: "yoursenderid"
};

firebase.initializeApp(config);
```

Now we need to get a reference to our database. We start by getting a reference to the root of the database, then make connections to child nodes.

```js
this.rootRef = firebase.database().ref();
this.numRef = this.rootRef.child('react').child('num');
```

Next we're going to add a button that increases our number on each button press, and writes it to firebase.

```html
<div>
  {this.state.num}
  <button onClick={this.handleAdd}>Add</button>
</div>
```

```js
handleAdd(){
  this.numRef.set(this.state.num + 1)
}
```

Set will overwrite the data at the reference, but 'update' will let you write changes to specified children of a reference.

Now when we press the button, it's automatically being written to firebase!

<a name="demo"></a>
## Demo: Retrieving Data (5 mins)

We need to figure out how to do read from the database. First we are going to look at reading from a single node, then reading from a list of child nodes.

We should set up the reading in `componentDidMount`

```js
this.numRef.on('value', snapshot => {
  this.setState({num: snapshot.val()});
});
```

This will be triggered any time the data changes, but we can read once by changing the following:

```js
this.numRef.once('value').then(snapshot => {
  this.setState({num: snapshot.val()})
})
```

Snapshot contains two key pieces of data, the key and the value. We retrieve the key with `snapshot.key`, and the value with `snapshot.val()`.

That's all there is to reading data!

> Check: Was everyone able to complete the demo?

***

<a name="introduction"></a>
## Introduction: Child Events (5 mins)

The 'value' event that we just worked with are great for basic data, but if we want to work with things like lists of data, we want to use child events. Value events pass back the entire object when a change is made, whereas child events can give us the individual children that changed.

***

<a name="demo"></a>
## Demo: Child Events (5 mins)

Often our data is nested, and we want to monitor for changes under a node further down in the hierarchy. To do this, we use child event listeners.

> Show an example of when we would want to use this

Lets try adding a child_added listener to our code. It starts off just like our value listener, but the result is closer to a for-each loop.

> Walk through the child_added, child_changed, child_removed, and child_moved methods with the students. Remember that child_added is called when pulling down existing data.

```js
this.numRef.on('child_added', snapshot => {
  console.log(`${snapshot.key}: ${snapshot.val()}`)
});
```

But how do we write? It would be very difficult to try to generate our own keys, so firebase can do it for us!

```js
handleAdd(){
  this.numRef.push().set(Math.random())
}
```

Using `push()` between the reference and our value returns a new reference with a unique key.

***

<a name="guided-practice"></a>
## Lab 1: Chat room

Let's take our knowledge of firebase, and build a simple chat room with a partner! Allow a user to send a message that shows the time the message was sent and the content of the message.

[Starter code](./fbexample-starter/) is available.

***

## Lab 2: Deleting messages (10 mins)

Add functionality to your chatroom to allow users to delete chat messages from the chatroom. Since we don't have authentication set up, any user can delete any message, but you can imagine in the future being able to control access based on the user who posted and who is logged in.

***

<a name="conclusion"></a>
## Conclusion (5 mins)

Firebase Database is a very powerful tool. The setup is extremely fast, and requires very little effort. Even though the structure is different than what we are used to with databases, our familiarity with JSON makes this transition much easier. Going forwards, consider adding Firebase to your apps to make syncing data much easier.
