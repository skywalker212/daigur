import React from 'react';
import {connect} from 'react-redux';
import './upload.css';
import uploadFile from './../../Helper/uploadFile';
import firebase from 'firebase';

let fileTypes = [
    'image/jpeg',
    'image/pjpeg',
    'image/png'
  ]
  

class Upload extends React.Component{

    constructor(){
        super();
        this.state = {
            fileUploaded: false
        }
    }
    
    componentDidMount(state,props){
        let input = document.querySelector('input');
        input.addEventListener('change', this.updateImageDisplay);
    }

    render = ()=>{
        return (
            <div className='upload-dia'>
                <form className="file-input-form" method="post" encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                    <div>
                        <label htmlFor="image_uploads">Click here to choose images to upload (PNG, JPG)</label>
                        <input className="upload-btn" type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png"/>
                    </div>
                    <div className="preview">
                        <p>No files currently selected for upload</p>
                    </div>
                    <div>
                        <button className="ret-btn submit-btn" disabled={!this.state.fileUploaded}>Submit</button>
                    </div>
                    </form>
            </div>
        )
    }

        
    handleFormSubmit = (event)=>{
        event.preventDefault();
        let input = document.querySelector('input[type=file]');
        let file = input.files[0];
        let uid = this.props.user.uid;
        let uploaderName = this.props.user.displayName;
        let metadata = {
            contentType: 'image',
            customMetadata: {
                uid, uploaderName
            }
        };
        let uploadTask = uploadFile(file,metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                default:
                    //just for the sake of eslint
            }
        },(error)=>{
            switch (error.code) {
                case 'storage/unauthorized':
                    console.log("user doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    console.log("User canceled the upload");
                    break;
                case 'storage/unknown':
                    console.log("Unknown error occurred, inspect error.serverResponse");
                    break;
                default:
                    // just for the sake of eslint
              }
            
        },()=>{
            console.log("upload complete");
        });
    }

    updateImageDisplay = ()=>{
        let preview = document.querySelector(".preview");
        let input = document.querySelector('input');
        preview.removeChild(preview.firstChild);
        let file = input.files[0];
        if(file === undefined) {
            let para = document.createElement('p');
            para.textContent = 'No files currently selected for upload';
            preview.appendChild(para);
        } else {
            let listItem = document.createElement('div');
            let para = document.createElement('p');
            if(this.validFileType(file)) {
                para.textContent = 'File name ' + file.name + ', file size ' + this.returnFileSize(file.size) + '.';
                let image = document.createElement('img');
                image.src = window.URL.createObjectURL(file);

                listItem.appendChild(image);
                listItem.appendChild(para);
                this.setState({
                    fileUploaded: true
                });
            } else {
                para.textContent = 'File name ' + file.name + ': Not a valid file type. Update your selection.';
                listItem.appendChild(para);
            }
            preview.appendChild(listItem);
        }
    }

    validFileType = (file) => {
        for(let i = 0; i < fileTypes.length; i++) {
        if(file.type === fileTypes[i]) {
            return true;
        }
        }
    
        return false;
    }

    returnFileSize = (number) => {
        if(number < 1024) {
        return number + 'bytes';
        } else if(number >= 1024 && number < 1048576) {
        return (number/1024).toFixed(1) + 'KB';
        } else if(number >= 1048576) {
        return (number/1048576).toFixed(1) + 'MB';
        }
    }

}

let mapDispatchToProps = (dispatch, props)=>{
    return {};
}

let mapStateToProps = (state,props)=>{
    return {
        user: state.firebase.user
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Upload);