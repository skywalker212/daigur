import React, { Component } from 'react';
import Header from './header/header.jsx'
import {Provider} from 'react-redux';
import configureStore from './../Store/configureStore';

var store = configureStore();

class App extends Component {
  render() {
    return (
        <Provider store={store}><Header/></Provider>
    );
  }
}

export default App;
