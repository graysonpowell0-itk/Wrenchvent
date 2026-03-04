// Firebase Admin SDK for server-side operations
const admin = require('firebase-admin');
const path = require('path');

let db = null;

const initializeFirebase = () => {
  try {
    // Check if already initialized
    if (admin.apps.length > 0) {
      db = admin.firestore();
      return db;
    }

    // Initialize with service account
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 
                                './serviceAccountKey.json';
    
    let credential;
    
    // Try to use service account file
    try {
      const serviceAccount = require(path.resolve(serviceAccountPath));
      credential = admin.credential.cert(serviceAccount);
    } catch (error) {
      // Fallback to environment variables (for deployment)
      if (process.env.FIREBASE_PROJECT_ID) {
        credential = admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
        });
      } else {
        console.warn('⚠️  Firebase Admin not configured - using default credentials');
        credential = admin.credential.applicationDefault();
      }
    }

    admin.initializeApp({
      credential: credential,
      projectId: process.env.FIREBASE_PROJECT_ID
    });

    db = admin.firestore();
    console.log('✅ Firebase Admin initialized successfully');
    
    return db;
  } catch (error) {
    console.error('❌ Firebase Admin initialization failed:', error.message);
    // Return null but don't crash - allow server to run
    return null;
  }
};

const getDb = () => {
  if (!db) {
    db = initializeFirebase();
  }
  return db;
};

module.exports = { initializeFirebase, getDb, admin };
