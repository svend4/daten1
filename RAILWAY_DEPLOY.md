# Railway Deployment Guide - Level 1 (PHP)

## Quick Deploy

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository: `svend4/daten1`
4. Select branch: `claude/level1-TDUEs`
5. Railway will automatically detect and deploy PHP application

## Configuration

- **Runtime**: PHP 8.2
- **Database**: SQLite (included)
- **Port**: Automatically assigned by Railway

## Environment Variables

No environment variables needed for this basic setup.

## Post-Deployment

The database will be automatically initialized on first deployment via `init_db.php`.

## Access

Your application will be available at the Railway-provided URL (e.g., `https://your-app.railway.app`)
