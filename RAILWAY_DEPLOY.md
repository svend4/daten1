# Railway Deployment Guide - Level 2 (Flask)

## Quick Deploy

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository: `svend4/daten1`
4. Select branch: `claude/level2-TDUEs`
5. Railway will automatically detect and deploy Flask application

## Configuration

- **Runtime**: Python 3.x
- **Database**: SQLite (included)
- **Web Server**: Gunicorn
- **Port**: Automatically assigned by Railway

## Environment Variables (Optional)

- `SECRET_KEY` - Flask secret key (auto-generated if not provided)
- `FLASK_DEBUG` - Set to "True" for debug mode (default: False)

## Post-Deployment

The SQLite database is included and pre-populated with sample data.

## Access

Your application will be available at the Railway-provided URL (e.g., `https://your-app.railway.app`)

## Features

- Product catalog with search
- Shopping cart functionality
- Order placement
- Category filtering
