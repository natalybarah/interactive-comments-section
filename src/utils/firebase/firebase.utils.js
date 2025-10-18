// NOTE: Not used currently. Kept for future Firebase integration.

import {getFirestore, initializeApp} from 'firebase/app';
import {collection, addDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCzajScXh28pVG9hkL7rhfvWznOuRyZidk",
  authDomain: "interactive-comments-db.firebaseapp.com",
  projectId: "interactive-comments-db",
  storageBucket: "interactive-comments-db.firebasestorage.app",
  messagingSenderId: "919539066545",
  appId: "1:919539066545:web:b274154782857ad0126490",
  measurementId: "G-KJQLL79L10"
};

const app= initializeApp(firebaseConfig);
const db= getFirestore(app);
