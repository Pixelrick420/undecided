import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDVQCpV5xlyIBcX48-97xyDSnATcofyhNc",
  authDomain: "namecardgen.firebaseapp.com",
  databaseURL: "https://namecardgen-default-rtdb.firebaseio.com",
  projectId: "namecardgen",
  storageBucket: "namecardgen.appspot.com",
  messagingSenderId: "139225899676",
  appId: "1:139225899676:web:5e29f827d7f3092a0e4359",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
