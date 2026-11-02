# Weekly Football

A personal football journal built with Node.js, Express, EJS and MongoDB.

## Features
- Responsive editorial-style home page
- Published post listing and individual story pages
- About, contact and Wolven Heart sections
- Editor sign-in and post composition flow

## Run locally
1. Install Node.js and MongoDB.
2. Install dependencies with `npm install`.
3. Start MongoDB locally, or set `MONGODB_URI` to your connection string.
4. Run `npm start` and open http://localhost:3000.

The editor login expects a user record to already exist in the MongoDB `users` collection. This project began as a learning project; before deploying it publicly, replace the current global login flag and plaintext-password comparison with session-based authentication and hashed passwords.

## Stack
Node.js · Express · EJS · MongoDB · Mongoose
