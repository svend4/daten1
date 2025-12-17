# Railway Deployment Guide - Level 7 (Microservices Architecture)

## Architecture Overview

This level implements an enterprise microservices architecture with:

- **product-service**: Node.js service for product catalog
- **order-service**: Python Flask service for order management
- **notification-service**: Python service for order notifications
- **frontend**: React + Vite UI
- **api-gateway**: Nginx reverse proxy (optional for Railway)
- **Database**: PostgreSQL (shared or separate per service)
- **Message Queue**: Redis (for notification service)

## Deployment Strategy

### Option 1: Deploy Each Service Separately (Recommended for Railway)

Deploy each microservice as a separate Railway service:

#### 1. Product Service

1. Create new service in Railway
2. Connect to GitHub repo: `svend4/daten1`
3. Select branch: `claude/level7-TDUEs`
4. Set root directory: `services/product-service`
5. Add environment variables:
   - `PORT` = Auto-assigned by Railway
   - `DATABASE_URL` = PostgreSQL connection string

**Tech Stack**: Node.js + Express + PostgreSQL

#### 2. Order Service

1. Create new service in Railway
2. Connect to same GitHub repo
3. Select branch: `claude/level7-TDUEs`
4. Set root directory: `services/order-service`
5. Add environment variables:
   - `PORT` = Auto-assigned by Railway
   - `DATABASE_URL` = PostgreSQL connection string
   - `PRODUCT_SERVICE_URL` = URL of product-service from step 1
   - `REDIS_URL` = Redis connection string (from Railway Redis service)

**Tech Stack**: Python + Flask + PostgreSQL + Redis

#### 3. Notification Service

1. Create new service in Railway
2. Connect to same GitHub repo
3. Select branch: `claude/level7-TDUEs`
4. Set root directory: `services/notification-service`
5. Add environment variables:
   - `REDIS_URL` = Redis connection string (shared with order-service)

**Tech Stack**: Python + Redis (worker)

#### 4. Frontend

1. Create new service in Railway
2. Connect to same GitHub repo
3. Select branch: `claude/level7-TDUEs`
4. Set root directory: `frontend`
5. Add environment variables:
   - `VITE_PRODUCT_SERVICE_URL` = URL of product-service
   - `VITE_ORDER_SERVICE_URL` = URL of order-service

**Tech Stack**: React + Vite

### Option 2: Use Docker Compose (Local Testing Only)

Railway doesn't directly support docker-compose, but you can test locally:

```bash
docker-compose up
```

This will start all services:
- Frontend: http://localhost:3000
- Product Service: http://localhost:3001
- Order Service: http://localhost:3002
- Notification Worker: (background)
- API Gateway: http://localhost (port 80)

## Required Railway Add-ons

1. **PostgreSQL**: Add one PostgreSQL instance (can be shared across services)
2. **Redis**: Add one Redis instance (for notification queue)

## Environment Variables Summary

### Product Service
```
PORT=<auto>
DATABASE_URL=<postgresql-url>
NODE_ENV=production
```

### Order Service
```
PORT=<auto>
DATABASE_URL=<postgresql-url>
PRODUCT_SERVICE_URL=<product-service-url>
REDIS_URL=<redis-url>
FLASK_ENV=production
```

### Notification Service
```
REDIS_URL=<redis-url>
```

### Frontend
```
VITE_PRODUCT_SERVICE_URL=<product-service-url>
VITE_ORDER_SERVICE_URL=<order-service-url>
```

## Database Setup

After deploying services with PostgreSQL:

1. For Product Service:
   ```bash
   # Run in Railway console
   npm run db:migrate
   npm run db:seed
   ```

2. For Order Service:
   ```bash
   # Run in Railway console
   python -c "from app import init_db; init_db()"
   ```

## Service Communication

Services communicate via HTTP REST APIs:
- Frontend → Product Service (get products)
- Frontend → Order Service (create orders)
- Order Service → Product Service (validate products)
- Order Service → Notification Service (via Redis queue)

## Deployment Order

1. Deploy PostgreSQL and Redis first
2. Deploy Product Service (needs database)
3. Deploy Order Service (needs database, product service URL, and Redis)
4. Deploy Notification Service (needs Redis)
5. Deploy Frontend (needs product and order service URLs)

## Monitoring & Logs

Each service has its own logs in Railway dashboard. Monitor:
- Product Service: API requests and database queries
- Order Service: Order creation and Redis queue
- Notification Service: Message processing
- Frontend: Build and serving logs

## Scaling

Railway allows you to scale each service independently:
- Scale product-service for high read traffic
- Scale order-service for high write traffic
- Add more notification workers for faster processing

## Cost Optimization

For development/testing, you can:
- Use a single PostgreSQL instance for all services
- Use Railway's free tier Redis
- Start with minimal replicas and scale as needed

## Access

After deployment:
- **Frontend**: `https://your-frontend.railway.app`
- **Product API**: `https://your-product-service.railway.app/api/products`
- **Order API**: `https://your-order-service.railway.app/api/orders`

## Note on API Gateway

The nginx API gateway is designed for local Docker Compose deployment. On Railway, you don't need it because:
- Each service gets its own URL
- Railway handles routing and SSL
- CORS is configured in each service

## Troubleshooting

- **Service can't connect to database**: Check DATABASE_URL is set correctly
- **Order service can't reach product service**: Check PRODUCT_SERVICE_URL
- **Notifications not sending**: Check REDIS_URL is same for order and notification services
- **Frontend API calls fail**: Check VITE_* environment variables and CORS settings
