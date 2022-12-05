import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


export const firebaseConfig= {
  apiKey: "AIzaSyDZqRnMPTm-4xhys51TEuFPt8BSwOQDd8M",
  authDomain: "rickapp-1db61.firebaseapp.com",
  projectId: "rickapp-1db61",
  storageBucket: "rickapp-1db61.appspot.com",
  messagingSenderId: "1081939778779",
  appId: "1:1081939778779:web:c164dd1e71a466ef1780fe",
  measurementId: "G-17G2YFVKV2"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const Firestore = getFirestore(app);
export const db = getFirestore(app);
