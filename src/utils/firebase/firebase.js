import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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