import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, enableIndexedDbPersistence } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCckKZaXVi7pMIxMusbVBdP1X-cnMjK4aI",
    authDomain: "medic-138.firebaseapp.com",
    projectId: "medic-138",
    storageBucket: "medic-138.firebasestorage.app",
    messagingSenderId: "630539172960",
    appId: "1:630539172960:web:430d5bef98e187843c5705",
    measurementId: "G-8LHESFVDMS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

// Enable offline persistence
enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.log('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        console.log('Persistence not supported by browser');
    }
});
