import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, provider, db } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, getDocs } from 'firebase/firestore';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = () => {
        return signInWithPopup(auth, provider);
    };

    const logout = () => {
        return signOut(auth);
    };

    // Progress Saving Logic
    const saveProgress = async (courseId, data) => {
        if (!user) return;
        try {
            const total = Object.keys(data).length;
            const completed = Object.values(data).filter(v => v === true).length;
            const percent = Math.round((completed / total) * 100);

            const progressRef = doc(db, "users", user.uid, "progress", courseId);
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

    const getProgress = async (courseId) => {
        if (!user) return null;
        try {
            const docRef = doc(db, "users", user.uid, "progress", courseId);
            const docSnap = await getDoc(docRef);
            return docSnap.exists() ? docSnap.data() : null;
        } catch (e) {
            console.error("Get Progress Error:", e);
            return null;
        }
    };

    const getAllProgress = async () => {
        if (!user) return [];
        try {
            const querySnapshot = await getDocs(collection(db, "users", user.uid, "progress"));
            return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (e) {
            console.error("Get All Progress Error:", e);
            return [];
        }
    };

    const value = {
        user,
        login,
        logout,
        saveProgress,
        getProgress,
        getAllProgress,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
