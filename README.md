# Traveler Record App

A travel website starter for route history, trip-specific expense ledgers, and completed trip records.

## Tech Stack

- Frontend: React, Vite, React Router, Leaflet
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT with hashed passwords

## First MVP

- Register and login
- Create trips with source and destination
- Show active trips with a red route
- Mark trips as done and show them with a green route
- Resume completed trips
- Add expenses only while a trip is active
- View trip history

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create backend environment file:

```bash
copy .env.example server\.env
```

3. For quick local testing, keep `DATA_STORE=memory` in `server/.env`.

The memory store lets register, login, trips, and expenses work without MongoDB. Data resets when the backend restarts.

To use real MongoDB later, change `DATA_STORE=mongodb` and start MongoDB locally.

4. Run the website and API together:

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.
Backend runs at `http://localhost:5000`.

5. Live At:
https://shivam-2807.github.io/Traveler-Record-App/

## Project Layout

```text
client/   React website
server/   Express API
docs/     Planning notes
```
