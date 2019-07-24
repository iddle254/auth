import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import API from '../api';

class App extends Component {
  state = { loggedIn: false };
  componentWillMount() {
    const firebaseConfig = {
      apiKey: API,
      authDomain: 'auth-ee001.firebaseapp.com',
      databaseURL: 'https://auth-ee001.firebaseio.com',
      projectId: 'auth-ee001',
      storageBucket: '',
      messagingSenderId: '475405169529',
      appId: '1:475405169529:web:363f349b6561d1be'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }
  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <Button
          onPress={() => firebase.auth().signOut()}
          >Log Out</Button>
        );
      case false:
      return <LoginForm />;
      default:
      return <Spinner size="large" />;
    }
  }
  render() {
    return (
      <View>
      <Header headerText="Authentication" />
      {this.renderContent()}
      </View>
    );
  }
}
export default App;
