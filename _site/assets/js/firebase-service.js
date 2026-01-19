// In a new file: firebase-service.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  // ... your keys here
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function fetchGameConfig(gameId) {
  const querySnapshot = await getDocs(collection(db, "games", gameId, "questions"));
  // Transform data to match your GameEngine expected format
  return querySnapshot.docs.map(doc => doc.data());
}