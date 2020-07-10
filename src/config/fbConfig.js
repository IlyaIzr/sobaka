import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyAspDt_cbClGWZNA6wu37lz78oC1Mj4e7U",
  authDomain: "s0baka.firebaseapp.com",
  databaseURL: "https://s0baka.firebaseio.com",
  projectId: "s0baka",
  storageBucket: "s0baka.appspot.com",
  messagingSenderId: "82334992553",
  appId: "1:82334992553:web:2868bfffcc7f2eab"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 // firebase.firestore().settings({ timestampsInSnapshots: true });
//smth that needed, updates firabase prop 
export default firebase 
