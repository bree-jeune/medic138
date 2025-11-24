import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
    getAuth, 
    GoogleAuthProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// 1. EXPOSE DB TO WINDOW (Crucial for Dashboard)
window.firebaseDb = db;
window.firebaseAuth = auth;

enableIndexedDbPersistence(db).catch((err) => {
    if (err.code == 'failed-precondition') {
        console.log('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        console.log('Persistence not supported by browser');
    }
});

// 2. ROBUST SAVE FUNCTION
window.saveProgressToCloud = async (courseId, data) => {
    const user = auth.currentUser;
    if (!user) return; // Guard clause
    
    try {
        // Calculate percentage for the dashboard
        const total = Object.keys(data).length;
        const completed = Object.values(data).filter(v => v === true).length;
        const percent = Math.round((completed / total) * 100);

        const progressRef = doc(db, "users", user.uid, "progress", courseId);
        
        // Save specific checkbox state AND summary stats
        await setDoc(progressRef, {
            ...data,
            _meta: {
                lastUpdated: new Date(),
                percentComplete: percent,
                courseId: courseId
            }
        }, { merge: true });
        
        console.log(`Saved ${courseId}: ${percent}%`);
    } catch (e) {
        console.error("Save Error:", e);
    }
};

// 3. EXPOSE GET FUNCTION
window.getCourseData = async (courseId) => {
    const user = auth.currentUser;
    if (!user) return null;
    const docRef = doc(db, "users", user.uid, "progress", courseId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
};

// 4. AUTH LISTENER
onAuthStateChanged(auth, async (user) => {
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const dashLink = document.getElementById("nav-dashboard-link");
    const userDisplay = document.getElementById("userDisplay");

    if (user) {
        // USER IS LOGGED IN
        window.currentUser = user;
        
        // 1. UI Toggles
        if (loginBtn) loginBtn.classList.add("hidden");
        if (logoutBtn) logoutBtn.classList.remove("hidden");
        if (dashLink) dashLink.classList.remove("hidden");
        
        // 2. Avatar/Name Display
        if (userDisplay) {
            const name = user.displayName ? user.displayName.split(' ')[0] : 'Medic';
            // If they have a photo, show it, otherwise show generic icon
            const avatar = user.photoURL 
                ? `<img src="${user.photoURL}" style="width:24px; height:24px; border-radius:50%; vertical-align:middle; margin-right:5px;">` 
                : `<span style="margin-right:5px;">👤</span>`;
            
            userDisplay.innerHTML = `${avatar} ${name}`;
        }

        // 3. Trigger Progress Sync (Fixes the progress bar issue)
        const event = new CustomEvent('userReady', { detail: user });
        window.dispatchEvent(event);

    } else {
        // USER IS LOGGED OUT
        window.currentUser = null;
        
        if (loginBtn) loginBtn.classList.remove("hidden");
        if (logoutBtn) logoutBtn.classList.add("hidden");
        if (dashLink) dashLink.classList.add("hidden");
        if (userDisplay) userDisplay.textContent = "";
    }
});

// Expose Login/Logout
window.authService = {
    login: () => signInWithPopup(auth, provider),
    logout: () => signOut(auth).then(() => window.location.reload())
};