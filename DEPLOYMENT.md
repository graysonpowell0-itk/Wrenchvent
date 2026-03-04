# WrenchVent - Deployment Guide

## Quick Deploy Options

### Option 1: Railway (Recommended - Easiest)

1. **Sign up at [Railway.app](https://railway.app)**

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select this repo

3. **Add MongoDB**
   - Click "+ New"
   - Select "Database" → "Add MongoDB"
   - Railway will automatically create and link the database

4. **Set Environment Variables**
   - Click on your service
   - Go to "Variables" tab
   - Add:
     - `HUME_API_KEY` = your_hume_api_key
     - `SESSION_SECRET` = random_secret_string
     - `FRONTEND_URL` = (will be auto-generated after first deploy)

5. **Deploy**
   - Railway will auto-deploy on every push
   - Your app URL will be shown in the "Deployments" tab

### Option 2: Vercel + MongoDB Atlas

1. **Set up MongoDB Atlas**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create free cluster
   - Get connection string (looks like: `mongodb+srv://...`)

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel
   ```

3. **Add Environment Variables**
   - In Vercel dashboard → Settings → Environment Variables:
     - `HUME_API_KEY`
     - `MONGODB_URI`
     - `SESSION_SECRET`
     - `NODE_ENV` = production

### Option 3: Render

1. **Sign up at [Render.com](https://render.com)**

2. **Create Web Service**
   - New → Web Service
   - Connect GitHub repo
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Add MongoDB**
   - Create new MongoDB database in Render
   - Copy connection string

4. **Environment Variables**
   - Add all required variables in Render dashboard

## Local Development with Database

```bash
# Install MongoDB locally (macOS)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Set up environment
cp .env.example .env
# Edit .env with your values

# Run app
npm install
npm run dev
```

## Environment Variables Required

```
HUME_API_KEY=your_hume_api_key_here
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=random_secret_string_min_32_chars
PORT=3001
NODE_ENV=production
FRONTEND_URL=https://your-app-url.com
```

## Post-Deployment Checklist

- [ ] MongoDB connected successfully
- [ ] Hume API working (test voice preview)
- [ ] Sessions saving to database
- [ ] User profiles persisting
- [ ] CORS configured correctly
- [ ] HTTPS enabled
- [ ] Environment variables secure

## Testing Your Deployment

1. Open your deployed URL
2. Create a session (vent or fix)
3. Check MongoDB to see if data saved
4. Test voice preview
5. Refresh page - data should persist

## Troubleshooting

**MongoDB connection fails:**
- Whitelist IP: 0.0.0.0/0 in MongoDB Atlas Network Access
- Check connection string format
- Verify environment variable name

**Hume API errors:**
- Verify API key is correct
- Check API key has sufficient credits
- Review server logs

**Sessions not saving:**
- Check MongoDB connection
- Verify API endpoints are accessible
- Check browser console for errors
