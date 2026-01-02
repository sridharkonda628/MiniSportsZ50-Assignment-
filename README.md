# Mini Sports / Casino Games Platform

A full-stack application for viewing sports matches and managing favorites.

## Tech Stack
- **Frontend**: React, Tailwind CSS (v3), Vite
- **Backend**: Node.js, Express, Prisma (v5), SQLite (Fallback)

## Current Status
- **Frontend**: Running on `http://localhost:5173` (Use `npm run dev` in `client` folder).
- **Backend**: Running on `http://localhost:5000` (Use `npm start` in `server` folder).

## Setup Instructions

### Prerequisites
- Node.js


### Backend Setup
1. Navigate to `server` directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file with your database credentials:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/mini_sports_db?schema=public"
   JWT_SECRET="your_secret_key"
   PORT=5000
   ```
4. Run migrations and seed data:
   ```bash
   npx prisma migrate dev --name init
   node prisma/seed.js
   ```
5. Start the server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to `client` directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Login.
- `GET /games`: Get all games (supports `?sport=...`).
- `GET /favorites`: Get user favorites.
- `POST /favorites/:gameId`: Add favorite.
- `DELETE /favorites/:gameId`: Remove favorite.
