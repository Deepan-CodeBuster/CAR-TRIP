import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDA3b6M9R2BvjLonaKO4FstUSKTzjZzg8E",
  authDomain: "fir-4e821.firebaseapp.com",
  projectId: "fir-4e821",
  storageBucket: "fir-4e821.appspot.com",
  messagingSenderId: "285131221873",
  appId: "1:285131221873:web:bd3b9fa7c2c847e181a4d0",
  measurementId: "G-MW4ZWGQ23Q"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
