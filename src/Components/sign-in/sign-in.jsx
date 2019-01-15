import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import './sign-in.css';
import {incCnt,decCnt} from './../../Actions/temp';
import Button from './../Button/button.jsx';

class SignIn extends React.Component{
    constructor(){
        super();
        this.state={
            showModal:false
        }
    };
    render(){
        return (
            <div className="com-sign">
                <Button className="sign-in" onClick={this.handleOpenModal} text='Sign In'/>
                <ReactModal isOpen={this.state.showModal}
                            contentLabel="Sign IN"
                            onRequestClose={this.handleCloseModal}
                            className='signin-modal'
                            overlayClassName='signin-overlay'>
                    <Button onClick={this.handleCloseModal} className='modbut' text='Close'/>
                    <Button onClick={this.props.incCount} text='+'/>
                    <p>{this.props.count}</p>
                    <Button onClick={this.props.decCount} text='-'/>
                </ReactModal>
            </div>
        );
    }
    getParent = ()=>{
        return document.querySelector('#com-sign');
    }
    handleOpenModal = ()=>{
        this.setState({showModal:true});
    }
    handleCloseModal = ()=>{
        this.setState({showModal:false});
    }
};

const mapDispatchToProps = (dispatch,props)=>({
    incCount: ()=>dispatch(incCnt()),
    decCount: ()=>dispatch(decCnt())
})

const mapStateToProps = (state, props)=>({
    count: state.temp.count
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);