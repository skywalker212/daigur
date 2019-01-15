import React, { Component } from 'react';
import Header from './header/header.jsx'
import {addProvider} from './../Actions/firebase';
import {connect} from 'react-redux';
import connectFirebase from './../Helper/connectFirebase';


class App extends Component {
  componentWillMount(){
    connectFirebase.then((provider)=>{
      this.props.addProvider(provider);
    }).catch((err)=>{
      console.error(err);
    });
  }
  render() {
    return (
        <Header/>
    );
  }
}

var mapDispatchToProps = (dispatch, props)=>({
  addProvider: (provider)=>dispatch(addProvider(provider))
})

export default connect(undefined, mapDispatchToProps)(App);
