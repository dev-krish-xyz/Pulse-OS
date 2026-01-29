#!/bin/bash

echo "🚀 Setting up Pulse OS..."

# Create backend .env if it doesn't exist
if [ ! -f backend/.env ]; then
  echo "📝 Creating backend/.env..."
  cp backend/env.example backend/.env
fi

# Create frontend .env if it doesn't exist
if [ ! -f frontend/.env ]; then
  echo "📝 Creating frontend/.env..."
  echo "VITE_API_URL=http://localhost:5000" > frontend/.env
fi

# Run Prisma migrations
echo "🗄️  Running database migrations..."
cd backend
npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  Backend:  cd backend && npm run dev"
echo "  Frontend: cd frontend && npm run dev"
