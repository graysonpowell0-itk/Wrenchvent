# Firebase Deployment Guide

## Prerequisites

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

## Initial Setup

1. **Get Firebase Configuration**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your "Wrenchvent" project
   - Click the gear icon → Project settings
   - Scroll down to "Your apps" → Web app
   - Copy the configuration values

2. **Set up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Firebase config:
   ```
   REACT_APP_FIREBASE_API_KEY=AIza...
   REACT_APP_FIREBASE_AUTH_DOMAIN=wrenchvent.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=wrenchvent
   REACT_APP_FIREBASE_STORAGE_BUCKET=wrenchvent.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
   REACT_APP_FIREBASE_APP_ID=1:123:web:abc
   HUME_API_KEY=your_hume_key
   ```

3. **Download Service Account Key** (for Cloud Functions)
   - Firebase Console → Project settings → Service accounts
   - Click "Generate new private key"
   - Save as `serviceAccountKey.json` in project root
   - **DO NOT commit this file!** (already in .gitignore)

4. **Initialize Firebase in your project**
   ```bash
   firebase init
   ```
   
   Select:
   - ✅ Firestore
   - ✅ Functions
   - ✅ Hosting
   
   When prompted:
   - Use existing project → select "wrenchvent"
   - Firestore rules: `firestore.rules`
   - Firestore indexes: `firestore.indexes.json`
   - Functions language: JavaScript
   - Use ESLint: No
   - Install dependencies: Yes
   - Public directory: `build`
   - Single-page app: Yes
   - GitHub deploys: No (for now)

## Deploy to Firebase

1. **Build the React app**
   ```bash
   npm run build
   ```

2. **Deploy everything**
   ```bash
   firebase deploy
   ```

   Or deploy separately:
   ```bash
   # Deploy only hosting
   firebase deploy --only hosting
   
   # Deploy only Firestore rules
   firebase deploy --only firestore:rules
   
   # Deploy only functions
   firebase deploy --only functions
   ```

3. **Set environment variables for Cloud Functions**
   ```bash
   firebase functions:config:set hume.api_key="your_hume_api_key"
   ```

## Post-Deployment

Your app will be live at:
```
https://wrenchvent.web.app
```
or
```
https://wrenchvent.firebaseapp.com
```

### Enable Firestore

1. Go to Firebase Console → Firestore Database
2. Click "Create database"
3. Select location (e.g., us-central1)
4. Start in production mode (we have security rules)

### Test Your Deployment

1. Visit your deployed URL
2. Try creating a vent session
3. Check Firestore in Firebase Console to see data
4. Test voice previews

## Local Development

Run with Firebase emulators:

```bash
# Install emulators
firebase init emulators

# Run everything locally
npm run dev

# In another terminal, run emulators
firebase emulators:start
```

## Environment Variables for Production

For Cloud Functions, set these:

```bash
firebase functions:config:set \
  hume.api_key="your_hume_key" \
  app.url="https://wrenchvent.web.app"
```

View current config:
```bash
firebase functions:config:get
```

## Troubleshooting

**Build fails:**
- Make sure all Firebase env vars are set
- Check `.env` file exists and has correct values

**Functions not working:**
- Upgrade to Blaze plan (pay-as-you-go) for external API calls
- Check function logs: `firebase functions:log`

**Firestore permissions denied:**
- Deploy security rules: `firebase deploy --only firestore:rules`
- Check rules match your auth setup

**CORS errors:**
- Make sure CORS is configured in server.js
- Check Firebase Hosting rewrites in firebase.json

## Monitoring

- **Hosting usage**: Firebase Console → Hosting
- **Firestore data**: Firebase Console → Firestore Database
- **Function logs**: Firebase Console → Functions → Logs
- **Analytics**: Firebase Console → Analytics (if enabled)

## Updating

After making changes:

```bash
# 1. Build
npm run build

# 2. Deploy
firebase deploy

# Or just deploy what changed
firebase deploy --only hosting
```

## Rollback

If something goes wrong:

```bash
# List previous deployments
firebase hosting:channel:list

# Rollback hosting
firebase hosting:rollback
```
