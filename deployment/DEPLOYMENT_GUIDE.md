# 🚀 Deployment Guide

This guide covers deploying your Resume Builder application with **separate frontend and backend hosting**.

## 🏗️ Architecture Overview

```
┌─────────────────┐    API Calls    ┌──────────────────┐
│   Frontend      │ ──────────────► │    Backend       │
│   (Vercel/      │                 │   (Heroku/       │
│   Netlify)      │ ◄────────────── │   Railway)       │
└─────────────────┘    PDF Response └──────────────────┘
```

## 📋 Prerequisites

- GitHub account (for code hosting)
- Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
- Choose your hosting platforms (recommendations below)

## 🎯 Recommended Hosting Combinations

### Option 1: Vercel + Heroku (Most Popular)
- **Frontend**: Vercel (excellent React support)
- **Backend**: Heroku (LaTeX buildpack available)

### Option 2: Netlify + Railway
- **Frontend**: Netlify (simple deployment)
- **Backend**: Railway (modern platform)

### Option 3: Docker (Most Flexible)
- Deploy anywhere that supports Docker containers

## 🚀 Step-by-Step Deployment

### 1️⃣ Backend Deployment (Choose One)

#### Option A: Heroku Backend

1. **Install Heroku CLI**:
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Deploy to Heroku**:
   ```bash
   cd server
   heroku create your-resume-api
   
   # Add LaTeX buildpack (IMPORTANT!)
   heroku buildpacks:add https://github.com/Scalingo/tex-buildpack
   heroku buildpacks:add heroku/nodejs
   
   # Set environment variables
   heroku config:set GEMINI_API_KEY=your_actual_api_key
   heroku config:set NODE_ENV=production
   heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app
   
   # Deploy
   git push heroku main
   ```

3. **Test Backend**:
   ```bash
   curl https://your-resume-api.herokuapp.com/health
   ```

#### Option B: Railway Backend

1. **Connect to Railway**:
   - Go to [Railway.app](https://railway.app)
   - Connect your GitHub repository
   - Select the `server` folder as root

2. **Configure Environment Variables**:
   ```
   GEMINI_API_KEY=your_actual_api_key
   NODE_ENV=production
   PORT=5000
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```

3. **Deploy**:
   - Railway auto-deploys on git push
   - LaTeX will be installed automatically

#### Option C: Docker Backend

1. **Build and Deploy**:
   ```bash
   # Build Docker image
   docker build -f deployment/dockerfile-backend -t resume-api .
   
   # Run locally to test
   docker run -p 5000:5000 -e GEMINI_API_KEY=your_key resume-api
   
   # Deploy to your preferred container platform
   # (DigitalOcean, AWS ECS, Google Cloud Run, etc.)
   ```

### 2️⃣ Frontend Deployment (Choose One)

#### Option A: Vercel Frontend

1. **Connect to Vercel**:
   - Go to [Vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set root directory to `vite-project`

2. **Configure Build Settings**:
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

3. **Set Environment Variables**:
   ```
   VITE_API_BASE_URL=https://your-backend-url.herokuapp.com
   VITE_ENVIRONMENT=production
   ```

4. **Deploy**:
   - Vercel auto-deploys on git push to main branch

#### Option B: Netlify Frontend

1. **Connect to Netlify**:
   - Go to [Netlify.com](https://netlify.com)
   - Connect your GitHub repository
   - Copy `deployment/netlify-frontend.toml` to `vite-project/netlify.toml`

2. **Update the TOML file** with your backend URL:
   ```toml
   [build.environment]
     VITE_API_BASE_URL = "https://your-actual-backend-url.herokuapp.com"
   ```

3. **Deploy**:
   - Netlify auto-deploys on git push

### 3️⃣ Configure CORS

**Update your backend environment variables**:
```bash
# For Heroku
heroku config:set FRONTEND_URL=https://your-actual-frontend-url.vercel.app

# For Railway
# Update in Railway dashboard: FRONTEND_URL=https://your-actual-frontend-url.vercel.app
```

## 🔧 Environment Variables Setup

### Backend Environment Variables
```bash
NODE_ENV=production
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://your-frontend-domain.com
LOG_LEVEL=INFO
```

### Frontend Environment Variables
```bash
VITE_API_BASE_URL=https://your-backend-domain.com
VITE_ENVIRONMENT=production
```

## ✅ Testing Your Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-backend-url/health
   # Should return: "API is healthy"
   ```

2. **Test Frontend**:
   - Visit your frontend URL
   - Fill out the resume form
   - Try generating a PDF
   - Check preview functionality

3. **Test Full Flow**:
   - Navigate through all pages (Home, Resume Builder, Templates, About)
   - Generate a resume PDF
   - Verify AI enhancement works (if API key is set)

## 🐛 Common Issues & Solutions

### LaTeX Errors
```bash
# If PDF generation fails, check Heroku logs:
heroku logs --tail --app your-resume-api

# Common fix: Ensure LaTeX buildpack is first:
heroku buildpacks:clear
heroku buildpacks:add https://github.com/Scalingo/tex-buildpack
heroku buildpacks:add heroku/nodejs
```

### CORS Errors
```bash
# Update FRONTEND_URL environment variable
heroku config:set FRONTEND_URL=https://your-actual-frontend-url.vercel.app
```

### Build Failures
```bash
# Check build logs in platform dashboard
# Ensure Node.js version compatibility (18+ recommended)
```

## 📊 Monitoring & Maintenance

### Heroku
- Monitor dyno usage and performance
- Check logs: `heroku logs --tail`
- Scale if needed: `heroku ps:scale web=2`

### Vercel/Netlify
- Monitor build times and function usage
- Check deployment logs in dashboard
- Set up domain and SSL certificates

## 💰 Cost Estimation

### Free Tier Options
- **Heroku**: 550-1000 free dyno hours/month
- **Vercel**: 100GB bandwidth, unlimited static sites
- **Netlify**: 100GB bandwidth, 300 build minutes
- **Railway**: $5 credit monthly

### Paid Tiers (if you exceed free limits)
- **Heroku**: ~$7/month for basic dyno
- **Vercel**: ~$20/month for Pro
- **Netlify**: ~$19/month for Pro
- **Railway**: Pay-as-you-go pricing

## 🔄 CI/CD Setup

Both platforms support automatic deployment:
- **Push to main branch** → Automatic deployment
- **Pull requests** → Preview deployments
- **Environment branches** → Staging deployments

## 🎉 You're Live!

Once deployed, your resume builder will be accessible worldwide:
- Users can access via your custom domain
- PDFs are generated server-side (no LaTeX needed on user devices)
- AI enhancement works seamlessly
- Responsive design works on all devices

Your application is now production-ready! 🚀
