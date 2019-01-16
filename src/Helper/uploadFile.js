import firebase from 'firebase';

let uploadFile = (file,metadata)=>{
    let storageRef = firebase.storage().ref();
    let imageRef = storageRef.child('user/'+metadata.customMetadata.uid+'/images/'+file.name);
    var uploadTask = imageRef.put(file,metadata);
    return uploadTask;
}

export default uploadFile;