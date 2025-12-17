# Railway Deployment Guide - Level 5 (React + Flask API)

## Architecture

This level consists of two separate services:
- **Backend**: Flask API (Python)
- **Frontend**: React + Vite

## Deployment Options

### Option 1: Deploy as Two Separate Services (Recommended)

#### Backend Service

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository: `svend4/daten1`
4. Select branch: `claude/level5-TDUEs`
5. Set root directory: `backend`
6. Add environment variable:
   - `PORT` = Railway will auto-assign

**Backend Configuration:**
- Runtime: Python 3.x
- Framework: Flask
- Database: SQLite (included)
- Start command: `gunicorn api:app --bind 0.0.0.0:$PORT`

#### Frontend Service

1. In same Railway project, click "New Service"
2. Select "GitHub Repo" → same repository
3. Select branch: `claude/level5-TDUEs`
4. Set root directory: `frontend`
5. Add environment variable:
   - `VITE_API_URL` = `<your-backend-url>` (from backend service)

**Frontend Configuration:**
- Runtime: Node.js
- Framework: React + Vite
- Build command: `npm run build`
- Start command: `npm run preview`

### Option 2: Deploy Backend Only

If you only want to test the API:

1. Deploy only the backend service
2. Test API at `https://your-backend.railway.app/api/products`

## Environment Variables

### Backend
- `PORT` - Automatically set by Railway

### Frontend
- `VITE_API_URL` - Backend API URL (e.g., `https://your-backend.railway.app`)

## Post-Deployment

1. Backend will be available at assigned Railway URL
2. Frontend will be available at assigned Railway URL
3. Make sure to update `VITE_API_URL` in frontend to point to backend

## Access

- **Backend API**: `https://your-backend.railway.app/api`
- **Frontend**: `https://your-frontend.railway.app`

## Features

- RESTful API with Flask
- React SPA with modern UI
- Real-time updates
- SQLite database
