# Railway Deployment Guide - Level 4 (Node.js + Express)

## Quick Deploy

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository: `svend4/daten1`
4. Select branch: `claude/level4-TDUEs`
5. Railway will automatically detect and deploy Node.js application

## Configuration

- **Runtime**: Node.js (automatically detected)
- **Framework**: Express.js
- **Template Engine**: EJS
- **Database**: SQLite (included)
- **Port**: Automatically assigned by Railway via `process.env.PORT`

## Environment Variables

No environment variables required for basic deployment.

## Post-Deployment

The SQLite database is included and pre-populated with sample data.

## Access

Your application will be available at the Railway-provided URL (e.g., `https://your-app.railway.app`)

## Features

- Product catalog
- Product detail pages
- Order placement with EJS templates
- SQLite database integration
