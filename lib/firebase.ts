
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import admin from 'firebase-admin';

// Ensure you have your Firebase service account key JSON file
// and set the GOOGLE_APPLICATION_CREDENTIALS environment variable
// e.g., export GOOGLE_APPLICATION_CREDENTIALS="/path/to/your/serviceAccountKey.json"

if (!admin.apps.length) 
  try {
    admin.initializeApp({
       credential: admin.credential.applicationDefault(), // Uses GOOGLE_APPLICATION_CREDENTIALS
       databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com` // If using Realtime Database
    });
    console.log('Firebase Admin SDK initialized successfully.');
  } catch (error) {
    console.error('Firebase Admin SDK initialization error:', error);
   
}

export const firebaseAdmin = admin;
export const firestore = admin.firestore();
export const auth = admin.auth();
