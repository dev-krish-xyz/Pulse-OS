# Pulse OS - Hospital Management System

A modern, clean hospital management system MVP built with React, TypeScript, Node.js, and PostgreSQL.

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router v6
- TanStack Query
- Zustand
- Axios

### Backend
- Node.js + Express + TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt
- Zod validation

## Getting Started

### Prerequisites
- Node.js 20+
- Docker & Docker Compose
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd "Pulse OS"
```

2. Start PostgreSQL database
```bash
docker-compose up -d
```

3. Setup Backend
```bash
cd backend
npm install
cp env.example .env
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed
npm run dev
```

4. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

5. Access the application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/health

## Project Structure

```
pulse-os/
├── frontend/          # React frontend
├── backend/           # Express backend
└── docker-compose.yml # PostgreSQL container
```

## Default Test Users

After running seed script:
- Admin: admin@pulseos.com / admin123
- Doctor: doctor@pulseos.com / doctor123
- Staff: staff@pulseos.com / staff123

## Features

- Patient Management
- Doctor Management
- Staff Management
- Appointment Scheduling
- Electronic Health Records (EHR)
- Billing & Invoicing
- Role-based Dashboards
- Secure Authentication

## License

MIT
