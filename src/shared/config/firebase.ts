import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBG3JGBLSfGNRXcMtLab_v_28PTl2n4OLY",
  authDomain: "notes-f7bb0.firebaseapp.com",
  projectId: "notes-f7bb0",
  storageBucket: "notes-f7bb0.appspot.com",
  messagingSenderId: "414246812263",
  appId: "1:414246812263:web:837f6350e3add36b2c32c2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
