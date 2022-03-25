
  // Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAuth} from "firebase/auth";
import {getStorage} from "firebase/storage";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDwe9zIJo-RDvrF1ehJOL3zT4hauhVbYMQ",
    authDomain: "fir-day2-a4f89.firebaseapp.com",
    databaseURL: "https://fir-day2-a4f89-default-rtdb.firebaseio.com",
    projectId: "fir-day2-a4f89",
    storageBucket: "fir-day2-a4f89.appspot.com",
    messagingSenderId: "362457466313",
    appId: "1:362457466313:web:2c87c2ee8e1f8712a81418"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app)
const auth = getAuth(app)
const storage = getStorage(app)



//   export default app;

  export {
    db,
    auth,
    storage
  }