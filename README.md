 Login System with Blog (React + Node + MongoDB):
Yeh project ek chhota login system aur blog application dikhata hai. Isme user registration/login aur blog posts ke CRUD (create/read/update/delete) features hain. Frontend React (Vite) par hai aur backend Node.js + Express + MongoDB (Mongoose) par.
 
yeh project React (Vite) frontend aur Node.js + Express + MongoDB (Mongoose) backend use karta hai. Authentication JWT ke through hoti hai aur token HTTP-only cookie mein store hota hai.

- User registration aur login (password hashing ke saath `bcrypt`).
- JWT ke through authentication; token HTTP-only cookie mein set hota hai.
- Blog posts ke liye CRUD — sirf post ka author edit/delete kar sakta hai.
- Simple REST API frontend ke liye available hai.

technology: 
- Frontend: React (Vite), React Router, Axios
- Backend: Node.js, Express, Mongoose, bcrypt, jsonwebtoken
- Database: MongoDB (local ya Atlas)


- `backend/` — Express server, routes, models, middleware
- `frontend/` — React app (Vite), components, pages, context

impotant files :

- Backend server: [backend/server.js](backend/server.js)
- Auth routes: [backend/routes/auth.js](backend/routes/auth.js)
- Posts routes: [backend/routes/posts.js](backend/routes/posts.js)
- Frontend entry: [frontend/src/main.jsx](frontend/src/main.jsx)


`backend/` folder mein `.env` file banayein aur kam se kam ye variables dalen:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/blogproject
JWT_SECRET=your_jwt_secret_here


- `MONGO_URI` — MongoDB connection string (local ya Atlas).
- `JWT_SECRET` — JWT sign karne ke liye secret (authentication ke liye zaroori).

Notes:
- Backend `dotenv` se ye variables padhta hai (dekhein [backend/server.js](backend/server.js)).
- Authentication ke liye cookies use hoti hain; backend mein CORS Vite dev origin (port 5173) ke liye configured ho sakta hai.
local development:
Prerequisites: Node.js (16+) aur MongoDB (local ya Atlas URI) chahiye.
1) Dependencies install karein


cd backend
npm install

cd ../frontend
npm install

2) Agar local MongoDB use kar rahe hain to start karein (`mongod` ya MongoDB service)

3) Backend start karein


cd backend
npm start

4) Frontend ek alag terminal mein start karein


cd frontend
npm run dev

Browser mein kholen: http://localhost:5173


API:
Base path: `/api`

- Authentication
  - `POST /api/auth/register` — naya user register karein. Body: `{ username, email, password }`.
  - `POST /api/auth/login` — user login. Body: `{ email, password }`. Successful login par HTTP-only cookie `token` set hoti hai.
  - `POST /api/auth/logout` — cookie clear karta hai.
  - `GET /api/auth/me` — cookie se user info return karta hai (agar token valid ho).

- Posts
  - `GET /api/posts` — sabhi posts (public).
  - `GET /api/posts/:id` — ek post ki detail (public).
  - `POST /api/posts` — nayi post create (auth required). Body: `{ title, content, imageUrl }`.
  - `PUT /api/posts/:id` — post update (auth required, sirf author allowed).
  - `DELETE /api/posts/:id` — post delete (auth required, sirf author allowed).

Implementation dekhein: [backend/routes/auth.js](backend/routes/auth.js) aur [backend/routes/posts.js](backend/routes/posts.js)


Authentication details:
- Server `process.env.JWT_SECRET` se JWT sign karta hai aur client ko HTTP-only cookie `token` mein bhejta hai (dekhein [backend/routes/auth.js](backend/routes/auth.js)).
- Protected routes `authMiddleware` se `req.cookies.token` padh kar verify karte hain (dekhein [backend/middleware/authMiddleware.js](backend/middleware/authMiddleware.js)).

Frontend:
- Frontend `AuthContext` (dekhein `frontend/src/context/AuthContext.jsx`) use karke auth state manage karta hai aur Axios se API calls karta hai.
- Dev ke dauraan frontend aam tor par `http://localhost:5173` aur backend `http://localhost:5000` par chalta hai.




