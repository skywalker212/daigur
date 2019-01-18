import React from 'react';
import {connect} from 'react-redux';
import firebase from 'firebase';
import {addHistory} from './../../Actions/firebase';
import Post from './../Post/post.jsx';

class Uploads extends React.Component{

    componentWillMount(){
        let history = firebase.database().ref('history');
        firebase.database.ref().onCreate((data)=>{
            console.log(data);
        })
        history.on('value',(snapshot)=>{
            // console.log(snapshot.val());
            let uploadHistory = [];
            snapshot.forEach((item)=>{
                uploadHistory.unshift(item.val());
            });
            // let service = new Promise((resolve,reject)=>{
                
            //     resolve();
            // });
            // service.then(()=>
            this.props.addHistory(uploadHistory);
            // ).catch((err)=>console.error(err));
        });
    }

    render = ()=>(
        <div className="uploads">
        <ul>
        {this.props.history && 
            [this.props.history.map((historyItem,index)=> <Post key={index} location={historyItem}/>)]
        }
        </ul>
        </div>
    )
}

var mapStateToProps = (state,props) => {
    return {
        history: state.firebase.history,
        user: state.firebase.user
    };
}

var mapDispatchToProps = (dispatch, props)=>{
    return {
        addHistory: (history)=>dispatch(addHistory(history))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Uploads);