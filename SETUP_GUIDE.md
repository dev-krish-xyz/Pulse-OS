# Pulse OS - Complete Setup & Run Guide

## Prerequisites

✅ Node.js 20+ installed
✅ Docker Desktop installed and running
✅ Git installed

---

## Quick Start (Recommended)

### Option 1: Using the startup script

```bash
# Make the script executable (first time only)
chmod +x start.sh

# Start everything
./start.sh
```

The script will:
- ✅ Start the PostgreSQL database (Docker)
- ✅ Create environment files if missing
- ✅ Start the backend API server
- ✅ Start the frontend dev server
- ✅ Display all URLs and credentials

**To stop:** Press `Ctrl+C`

---

## Manual Start (Step by Step)

### Step 1: Start Database

```bash
# Start PostgreSQL
docker-compose up -d

# Verify it's running
docker ps | grep pulse-os-db
```

### Step 2: Start Backend API

Open a **new terminal window**:

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 3000
📊 Environment: development
🔗 API: http://localhost:3000
```

### Step 3: Start Frontend

Open **another new terminal window**:

```bash
cd frontend
npm run dev
```

You should see:
```
VITE v7.3.1  ready in 95 ms
➜  Local:   http://localhost:5173/
```

---

## Access the Application

Open your browser and go to: **http://localhost:5173**

### Test Credentials

| Role   | Email                    | Password   |
|--------|--------------------------|------------|
| Admin  | admin@pulseos.com        | admin123   |
| Doctor | dr.smith@pulseos.com     | doctor123  |
| Staff  | staff@pulseos.com        | staff123   |

---

## Troubleshooting

### Problem: Port 5000 already in use

**Solution:** We've configured the backend to use port **3000** instead.

If you still see port conflicts:
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

### Problem: Database connection error

```bash
# Restart database
docker-compose down
docker-compose up -d

# Wait 5 seconds for it to start
sleep 5
```

### Problem: "Module not found" errors

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json .vite
npm install
```

### Problem: Login fails / API not responding

**Check backend is running:**
```bash
curl http://localhost:3000/health
# Should return: {"status":"ok","message":"Pulse OS API is running"}
```

**Check frontend env:**
```bash
cat frontend/.env
# Should show: VITE_API_URL=http://localhost:3000
```

If not, create it:
```bash
echo "VITE_API_URL=http://localhost:3000" > frontend/.env
```

Then restart frontend server.

---

## Verification Checklist

Run these commands to verify everything:

```bash
# 1. Database running
docker ps | grep pulse-os-db
# ✅ Should show running container

# 2. Backend API responding
curl http://localhost:3000/health
# ✅ Should return JSON with "ok" status

# 3. Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@pulseos.com","password":"admin123"}'
# ✅ Should return access_token and user info

# 4. Frontend accessible
curl -s http://localhost:5173 | grep title
# ✅ Should show <title>frontend</title>
```

---

## Project Structure

```
Pulse OS/
├── backend/              # Express API server
│   ├── src/
│   ├── prisma/          # Database schema & migrations
│   ├── .env             # Backend environment variables
│   └── package.json
│
├── frontend/            # React frontend
│   ├── src/
│   ├── .env            # Frontend environment variables
│   └── package.json
│
├── docker-compose.yml  # PostgreSQL database
├── start.sh           # One-command startup script
└── README.md          # This file
```

---

## Environment Files

### backend/.env
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pulse_os?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"
PORT=3000
NODE_ENV="development"
CORS_ORIGIN="http://localhost:5173"
```

### frontend/.env
```env
VITE_API_URL=http://localhost:3000
```

---

## Useful Commands

### Database Management

```bash
# View database with Prisma Studio
cd backend
npm run prisma:studio
# Opens at http://localhost:5555

# Reset database & reseed
cd backend
npx prisma migrate reset
```

### View Logs

```bash
# Backend logs (if using start.sh)
tail -f logs/backend.log

# Frontend logs (if using start.sh)
tail -f logs/frontend.log
```

### Stop Everything

```bash
# If using start.sh
# Press Ctrl+C in the terminal running start.sh

# Manual stop
pkill -f "ts-node-dev"  # Stop backend
pkill -f "vite"          # Stop frontend
docker-compose down      # Stop database
```

---

## Next Steps

Once logged in, you'll have access to:
- ✅ Dashboard (role-specific)
- 🚧 Patient Management (coming next)
- 🚧 Doctor Management (coming next)
- 🚧 Appointment Booking (coming next)
- 🚧 Medical Records (coming next)
- 🚧 Billing System (coming next)

---

## Need Help?

1. Check the troubleshooting section above
2. Verify all services are running (see verification checklist)
3. Check browser console for errors (F12)
4. Check terminal logs for errors

---

## Development

- Backend runs on: http://localhost:3000
- Frontend runs on: http://localhost:5173
- Database runs on: localhost:5432
- Hot reload enabled on both backend and frontend
