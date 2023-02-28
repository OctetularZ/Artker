import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDymEDiGgQQuu_tiKK7oH6HkI3qtzq7q1w",
  authDomain: "artker-8eda1.firebaseapp.com",
  projectId: "artker-8eda1",
  storageBucket: "artker-8eda1.appspot.com",
  messagingSenderId: "804119564822",
  appId: "1:804119564822:web:b5b25e941c42d4aba3db37"
};

let app;
if (firebase.apps.length == 0) {
  app = firebase.initializeApp(firebaseConfig);
}
else {
  app = firebase.app()
}

const db = app.firestore();
export {db};