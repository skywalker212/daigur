import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import './sign-in.css';
import Button from './../Button/button.jsx';
import firebase from 'firebase';
import {addUser, removeUser} from './../../Actions/firebase';

class SignIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showModal:false,
            githubText:props.user!==undefined?'Sign Out':'Sign in with GitHub'
        }
    };
    render = ()=>{
        return (
            <div className="com-sign">
                <Button className="sign-in" onClick={this.handleOpenModal} text={this.props.user!==undefined?"Hello, "+this.props.user.displayName:"Sign In"}/>
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
        let ths = this;
        if(this.props.user===undefined){
            this.setState({...this.state, githubText:'loading...'});
            firebase.auth().signInWithPopup(this.props.provider).then(function(result) {
                // let token = result.credential.accessToken;
                let user = result.user;
                sessionStorage.setItem('user',JSON.stringify(user));
                ths.props.addUser(user);
                console.log(user.uid);
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
                sessionStorage.removeItem('user');
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