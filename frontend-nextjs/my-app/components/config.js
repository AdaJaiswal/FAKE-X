// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDV34afch53_qs-2M5mtXyfzg0-T2bag8k",
  authDomain: "fake-identification-blockchain.firebaseapp.com",
  projectId: "fake-identification-blockchain",
  storageBucket: "fake-identification-blockchain.appspot.com",
  messagingSenderId: "355307205561",
  appId: "1:355307205561:web:1a012d21e4873e24c6fc68",
  measurementId: "G-678G8FVXXZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
