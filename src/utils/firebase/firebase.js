import { initializeApp } from 'firebase/app';
import { getAuth, 
        signInWithRedirect, 
        signInWithPopup, 
        GoogleAuthProvider, 
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut,
        onAuthStateChanged
    } from 'firebase/auth';

import { getFirestore, 
    doc, 
    getDoc, 
    setDoc,
    collection,
    writeBatch,
    query, 
    getDocs
 } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDS8VjWC79WiYKtPYr5Ub9DbnnZT10lGv8",
    authDomain: "e-marketplace-148dd.firebaseapp.com",
    projectId: "e-marketplace-148dd",
    storageBucket: "e-marketplace-148dd.appspot.com",
    messagingSenderId: "1004730981047",
    appId: "1:1004730981047:web:8ba7ed93f4c6d1e66d8b32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({ 
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);
export const db = getFirestore();

// Method to Add a Collection of Data Objects
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd, field='title') => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object[field].toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log("Done");
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');

    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, addInfo = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);

    if(!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { 
                displayName,
                email,
                createdAt,
                ...addInfo
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    // const response = await createUserWithEmailAndPassword(auth, email, password);
    // console.log("Response from Firebase Util");
    // console.log(response);

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);


export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);