import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig';

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reduxFirestore(fbConfig),
    reactReduxFirebase(fbConfig, {userProfile: 'users', useFirestoreForProfile: true, attachAuthIsReady: true}) // redux binding to firebase
    // redux bindings for firestore
  )
);  

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  registerServiceWorker();
});

let nav_Buttons = document.getElementsByClassName("nav-link");

console.log(nav_Buttons);
if(nav_Buttons){
[...nav_Buttons].forEach(element => {
  console.log(element);
  //element.addEventListener('click', function(){
  //  document.getElementsByClassName("navbar-toggler")[0].className += " collapsed";
  //  document.getElementsByClassName("navbar-collapse")[0].classList.remove("show");    
  //});
});
}
