// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBTzUMRSLrb6O_uDwV_fl6QzhJY10yAWrM",
//   authDomain: "appointment-deb6a.firebaseapp.com",
//   projectId: "appointment-deb6a",
//   storageBucket: "appointment-deb6a.firebasestorage.app",
//   messagingSenderId: "106776701337",
//   appId: "1:106776701337:web:4c01a51a3d7b1362378b08",
//   measurementId: "G-S2Q44LPZ0C"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// export { db };


// // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgc807yC97zUioqzCc3_jItswKqEwH4zc",
  authDomain: "student-teacher-1e6e4.firebaseapp.com",
  projectId: "student-teacher-1e6e4",
  storageBucket: "student-teacher-1e6e4.firebasestorage.app",
  messagingSenderId: "181719643350",
  appId: "1:181719643350:web:5076573e896164888d0577",
  measurementId: "G-MX66D6TH3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);