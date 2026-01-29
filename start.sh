#!/bin/bash

# Pulse OS - Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting Pulse OS..."
echo ""

# Check if Docker is running
if ! docker ps &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker Desktop first."
    exit 1
fi

# Check if database is running
if ! docker ps | grep -q pulse-os-db; then
    echo "📦 Starting PostgreSQL database..."
    docker-compose up -d
    echo "⏳ Waiting for database to be ready..."
    sleep 5
fi

# Check if backend .env exists
if [ ! -f backend/.env ]; then
    echo "📝 Creating backend/.env from template..."
    cp backend/env.example backend/.env
fi

# Check if frontend .env exists
if [ ! -f frontend/.env ]; then
    echo "📝 Creating frontend/.env..."
    echo "VITE_API_URL=http://localhost:3000" > frontend/.env
fi

echo ""
echo "✅ Database is running"
echo ""
echo "🔧 Starting services..."
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down services..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup SIGINT SIGTERM

# Start backend
echo "📡 Starting backend API (Port 3000)..."
cd backend
npm run dev > ../logs/backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait a bit for backend to start
sleep 3

# Start frontend
echo "🎨 Starting frontend (Port 5173)..."
cd frontend
npm run dev > ../logs/frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait for services to be ready
echo ""
echo "⏳ Waiting for services to start..."
sleep 3

# Check if services are running
if ! curl -s http://localhost:3000/health > /dev/null; then
    echo "❌ Backend failed to start. Check logs/backend.log"
    cleanup
    exit 1
fi

if ! curl -s http://localhost:5173 > /dev/null; then
    echo "❌ Frontend failed to start. Check logs/frontend.log"
    cleanup
    exit 1
fi

echo ""
echo "✅ All services are running!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  🏥 Pulse OS - Hospital Management System"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "  🎯 Frontend:  http://localhost:5173"
echo "  📡 Backend:   http://localhost:3000"
echo "  🗄️  Database:  localhost:5432"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Test Credentials:"
echo "   Admin:  admin@pulseos.com / admin123"
echo "   Doctor: dr.smith@pulseos.com / doctor123"
echo "   Staff:  staff@pulseos.com / staff123"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f logs/backend.log"
echo "   Frontend: tail -f logs/frontend.log"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Keep script running
wait
