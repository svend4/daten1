# Railway Deployment Guide - Level 6 (Next.js + TypeScript + Prisma)

## Quick Deploy

1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select repository: `svend4/daten1`
4. Select branch: `claude/level6-TDUEs`
5. Railway will automatically detect and deploy Next.js application

## Configuration

- **Runtime**: Node.js (automatically detected)
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: SQLite (default) or PostgreSQL (recommended for production)
- **Styling**: Tailwind CSS
- **State Management**: Zustand

## Environment Variables

### Required for Production

Create a `.env` file or add to Railway:

```
DATABASE_URL="file:./dev.db"
NODE_ENV="production"
```

### Optional (for PostgreSQL)

If you want to use PostgreSQL instead of SQLite:

1. In Railway, add a PostgreSQL service
2. Update `DATABASE_URL` to use the PostgreSQL connection string from Railway

```
DATABASE_URL="postgresql://user:password@host:port/database"
```

Then update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"  // changed from sqlite
  url      = env("DATABASE_URL")
}
```

## Build Configuration

Railway will automatically:
1. Install dependencies (`npm install`)
2. Generate Prisma client (`prisma generate`)
3. Build Next.js (`next build`)
4. Start the production server (`next start`)

## Database Setup

### With SQLite (Default)
The database file is included. Prisma will generate the client automatically.

### With PostgreSQL (Recommended for Production)
After adding PostgreSQL service in Railway:

1. Run migrations in Railway console:
   ```
   npx prisma migrate deploy
   ```

2. Seed the database:
   ```
   npm run db:seed
   ```

## Post-Deployment

The application will be available at the Railway-provided URL.

## Access

Your Next.js application will be available at `https://your-app.railway.app`

## Features

- Server-side rendering (SSR)
- API Routes
- Product catalog with categories
- Shopping cart with Zustand
- Order management
- TypeScript for type safety
- Prisma ORM for database
- Responsive design with Tailwind CSS

## Troubleshooting

If build fails:
1. Make sure all environment variables are set
2. Check that Prisma can generate the client
3. Verify DATABASE_URL is correct
