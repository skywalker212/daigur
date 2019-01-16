import firebase from 'firebase';

let connectFirebase = new Promise((resolve,reject)=>{
    let firConfig = {
      apiKey: process.env.REACT_APP_apiKey,
      authDomain: process.env.REACT_APP_authDomain,
      databaseURL: process.env.REACT_APP_databaseURL,
      storageBucket: process.env.REACT_APP_storageBucket
    }
    
    // console.log(firConfig);
    
    try{
        firebase.initializeApp(firConfig);
    }catch(err){
        reject(err);
    }
    
    try{
        let provider = new firebase.auth.GithubAuthProvider();
        resolve(provider);
    }catch(err){
        reject(err);
    }
});

export default connectFirebase;