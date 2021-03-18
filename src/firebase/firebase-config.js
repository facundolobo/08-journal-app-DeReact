import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//console.log(process.env); //process.env es obtener las variables de entorno

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID,

  };

//   const firebaseConfigTesting = {
//     apiKey: "AIzaSyCMvEbVE-aKX92AgV4hFUKn3wVNjc628dU",
//     authDomain: "redux-demo-67598.firebaseapp.com",
//     projectId: "redux-demo-67598",
//     storageBucket: "redux-demo-67598.appspot.com",
//     messagingSenderId: "310585835824",
//     appId: "1:310585835824:web:09362557e41b9a979708f5",
//     measurementId: "G-7M6QT10YSK"
//   };


//   if( process.env.NODE_ENV === 'test' ) {
//     // testing
//     firebase.initializeApp(firebaseConfigTesting);
// } else {
//     //dev/prod
// firebase.initializeApp(firebaseConfig);
// }
    
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();


export {
    db,
    googleAuthProvider,
    firebase
}