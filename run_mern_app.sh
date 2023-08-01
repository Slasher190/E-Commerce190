#!/bin/bash

# Run frontend (React) app
echo "Starting frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

# Run backend (Node.js) app
echo "Starting backend..."
cd ../backend
npm run dev &
BACKEND_PID=$!

# Wait for both processes to finish
wait $FRONTEND_PID $BACKEND_PID
