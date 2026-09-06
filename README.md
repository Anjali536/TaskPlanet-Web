# Social Feed

A full-stack social media feed application where users can create posts, upload images, like posts, and add comments. The application includes user authentication, dark mode, post filtering, and a responsive UI.

##  Live Demo

Frontend: https://task-planet-web.vercel.app

Backend API: [https://.onrender.com](https://taskplanet-web1.onrender.com/)

---

##  Features

### Authentication
- User signup
- User login
- JWT-based authentication
- Protected feed route
- Persistent login using localStorage
- Logout functionality

### Posts
- Create text posts
- Upload images with posts
- Image preview before posting
- Remove selected image before posting
- Post creation success/error messages
- Display posts in the feed
- Display author name, username, date and time

### Interactions
- Like and unlike posts
- Like count
- Add comments
- Comment count
- Display comment author avatar, username and user ID
- Comment success/error handling

### Feed Filters
- All Posts
- Most Liked
- Most Commented

### UI
- Responsive design
- Light mode
- Dark mode
- User avatar with username
- Wallet and points display
- Logout button
- Clean card-based feed interface

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Vite
- Material UI Icons
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Multer
- Cloudinary

### Deployment
- Frontend: Vercel
- Backend: Render
- Database: MongoDB

---

##  Project Structure
```text
social-feed/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── FilterTabs.jsx
│   │   │   └── PostCard.jsx
│   │   │
│   │   ├── context/
│   │   │   └── authContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Feed.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   ├── vercel.json
│   └── .env
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```
## Getting Started
## Clone the Repository
git clone https://github.com/Anjali536/TaskPlanet-Web.git
cd TaskPlanet-Web

## Frontend Setup
1. Navigate to Frontend
cd frontend

3. Install Dependencies
npm install

3. Configure Environment Variables
VITE_API_URL=http://localhost:5000/api

4. Start Frontend
npm run dev

## Backend Setup

1. Navigate to Backend
cd backend

2.Install Dependencies
npm install

3.Configure Environment Variables
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

4.Start Backend
npm run dev

## Author

Anjali Thakur

GitHub: https://github.com/Anjali536

LinkedIn: www.linkedin.com/in/anjali-thakur-158686298
