# Authentication with JWT

Express.js backend aur React frontend jo JWT ke through user registration, login aur protected route access handle karta hai.

## Live Links
- Frontend: <deployed frontend link yahan>
- Backend: <deployed backend link yahan>

## Features

### Backend (Express.js)
- `POST /register` - username aur password leta hai, user ko array mein store karta hai (password bcrypt se hashed)
- `POST /login` - credentials validate karke JWT return karta hai
- `GET /protected` - valid JWT ke bina access nahi hota (middleware se verify)

### Frontend (React)
- Registration aur login forms
- Login ke baad JWT local storage mein save hota hai
- Stored JWT ke saath protected route access hota hai
- Logout button token ko local storage se hata deta hai

## Tech Stack
- Node.js, Express.js, jsonwebtoken, bcryptjs, cors
- React (Vite)

## Run Locally

### Backend
cd backend
npm install
npm start
Server http://localhost:5000 pe chalega.

### Frontend
cd frontend
npm install
npm run dev
App http://localhost:5173 pe khulegi.

## Notes
- Users in-memory array mein store hote hain, isliye server restart hone pe data reset ho jata hai.
- JWT 1 ghante baad expire ho jata hai.