import * as firebase from "firebase";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBT4UM7hcPLdanmR2Rkc8Z4Rw5a6p_fPx0",
  authDomain: "notepad-app-db.firebaseapp.com",
  databaseURL: "https://notepad-app-db.firebaseio.com",
  projectId: "notepad-app-db",
  storageBucket: "notepad-app-db.appspot.com",
  messagingSenderId: "208282829640",
  appId: "1:208282829640:web:842aaba2bda25149"
};

export default firebase.initializeApp(firebaseConfig);