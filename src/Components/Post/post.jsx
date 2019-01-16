import React from 'react';
import firebase from 'firebase';

class Post extends React.Component{

    constructor(props){
        super(props)
        this.state={
            url:undefined,
            name:undefined,
            op:undefined
        }
    }

    render(){
        return (
            <div className="post">
                {this.state.url && <img src={this.state.url} alt={this.state.name}/>}
                {this.state.op && <p>Post by {this.state.op} </p>}
            </div>
        )
    }

    componentDidMount(){
        let storageRef = firebase.storage().ref();
        storageRef.child(this.props.location).getDownloadURL().then((url)=>{
            console.log(url);
            this.setState({
                url
            });
        })
        storageRef.child(this.props.location).getMetadata().then((metadata)=>{
            this.setState({
                name: metadata.name,
                op: metadata.customMetadata.uploaderName
            });
            // console.log(metadata);
        })
    }

}

export default Post;