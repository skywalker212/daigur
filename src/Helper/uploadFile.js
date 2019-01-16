import firebase from 'firebase';

let uploadFile = (file,metadata)=>{
    let storageRef = firebase.storage().ref();
    let databaseRef = firebase.database().ref();
    let imageRef = storageRef.child('users/'+metadata.customMetadata.uid+'/images/'+file.name);
    databaseRef.child('users/'+metadata.customMetadata.uid+'/uploads/images/').push(file.name);
    databaseRef.child('history/').push('users/'+metadata.customMetadata.uid+'/images/'+file.name);
    var uploadTask = imageRef.put(file,metadata);
    return uploadTask;
}

export default uploadFile;