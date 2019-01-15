import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import './sign-in.css';
import Button from './../Button/button.jsx';
import firebase from 'firebase';
import {addUser, removeUser} from './../../Actions/firebase';
import { stat } from 'fs';

class SignIn extends React.Component{
    constructor(){
        super();
        this.state={
            showModal:false,
            githubText:'Sign in with GitHub'
        }
    };
    render = ()=>{
        return (
            <div className="com-sign">
                <Button className="sign-in" onClick={this.handleOpenModal} text={this.props.user!=undefined?"Hello, "+this.props.user.displayName:"Sign In"}/>
                <ReactModal isOpen={this.state.showModal}
                            contentLabel="Sign IN"
                            onRequestClose={this.handleCloseModal}
                            className='signin-modal'
                            overlayClassName='signin-overlay'
                            ariaHideApp={false}>
                    <Button onClick={this.handleCloseModal} className='modbut' text='Close'/>
                    <Button onClick={this.handleSign} className='gitsign' text={this.state.githubText}/>
                </ReactModal>
            </div>
        );
    }

    getParent = ()=>{
        return document.querySelector('#com-sign');
    }

    handleSign = ()=>{
        var ths = this;
        if(this.props.user===undefined){
            this.setState({...this.state, githubText:'loading...'});
            firebase.auth().signInWithPopup(this.props.provider).then(function(result) {
                var token = result.credential.accessToken;
                var user = result.user;
                ths.props.addUser(user);
                ths.handleCloseModal();
                ths.setState({...ths.state, githubText:'Sign Out'});
              }).catch(function(error) {
                ths.setState({...ths.state, githubText:'Sign in with GitHub'});
                console.log(error);
              });
        }else{
            this.setState({...this.state, githubText:'loading...'});
            firebase.auth().signOut().then(function() {
                ths.setState({...ths.state, githubText:"Sign in with GitHub"});
                ths.props.removeUser();
                ths.handleCloseModal();
              }).catch(function(error) {
                  console.log(error);
              });
        }
    }

    handleOpenModal = ()=>{
        this.setState({showModal:true});
    }
    handleCloseModal = ()=>{
        this.setState({showModal:false});
    }
};

const mapDispatchToProps = (dispatch,props)=>({
    addUser: (user)=>dispatch(addUser(user)),
    removeUser: ()=>dispatch(removeUser())
})

const mapStateToProps = (state, props)=>({
    provider: state.firebase.provider,
    user: state.firebase.user
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);