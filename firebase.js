import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAgK--XfId4h8PazCSt-ZGutj8JAdWvCb8",
    authDomain: "nexlog-7b69e.firebaseapp.com",
    projectId: "nexlog-7b69e",
    storageBucket: "nexlog-7b69e.appspot.com",
    messagingSenderId: "82411398467",
    appId: "1:82411398467:web:019c492fb7c0466fc7fbf6",
    measurementId: "G-NTSE7SBSD1"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
