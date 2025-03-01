# 🧠 Session Tracker App - Learning Portal

A comprehensive Full-stack application for Mental Health Matters Inc. designed to manage therapy sessions, track homework assignments, and facilitate client progress tracking. This platform supports both admin and client user roles with specific features for each.

## 📑 Table of Contents
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Project Structure](#-project-structure)
- [Implementation Details](#-implementation-details)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Getting Started](#-getting-started)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

## 🛠️ Tech Stack

### Frontend
- ⚛️ Next.js 13+ (App Router)
- 📝 TypeScript
- 🎨 TailwindCSS
- 🧩 shadcn/ui component library
- 🔄 Axios for API requests
- 🍞 react-hot-toast for notifications
- ✨ Framer Motion for animations

### Backend
- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB Atlas
- 🔑 JWT for authentication
- 🔐 bcrypt.js for password hashing
- ⚠️ express-async-handler for error handling

## ✨ Features

### 🔐 User Authentication
- Secure login/signup system
- JWT-based authentication
- Role-based access (Admin and Client)
- Protected routes

### 📅 Session Management
- Interactive session list with accordion interface
- Session creation (Admin only)
- Session details and insights tracking
- Weekly progress monitoring

### 📝 Homework Management
- Task tracking tied to specific sessions
- Due date reminders
- Task status management (To-Do, In Progress, Done)
- Detailed task views with time tracking

## 🏗️ Project Structure

The application is structured into a frontend and backend component, following a modern full-stack architecture.

## 🔍 Implementation Details

### Session Management
Sessions serve as the core organizational unit of the application, containing all related data for therapy sessions.

**Session Features:**
- **Session Creation (Admin only):**
  - Create new session with session number, date, time, and activities
  - Set weekly end date for progress tracking
- **Session List View:**
  - Interactive accordion interface showing all sessions
  - Expandable items with animation and visual feedback
  - Displays session number and date when collapsed
- **Session Detail View:**
  - Session overview with key information
  - Session insights for tracking client progress
  - Weekly achievements and decision tracking
  - Profit tracking across different categories

### Homework Management
The homework system allows tracking assignments and tasks linked to specific sessions.

**Homework Features:**
- **Task Creation:**
  - Create tasks linked to specific sessions
  - Set due dates, start/end times, and status
  - Track additional metadata like FPR and DP remarks
- **Task List View:**
  - Filterable and searchable task list
  - Inline editing for quick updates
  - Status indicators with visual distinction
  - Pagination for large task lists
- **Task Details:**
  - Edit task details with form validation
  - Delete tasks with confirmation dialog
  - Status tracking (To-Do, In Progress, Done)

## 📚 API Documentation

### User Endpoints
- `POST /api/users` - Register a new user
- `POST /api/users/login` - Authenticate user and get token
- `GET /api/users/profile` - Get user profile (authenticated)

### Session Endpoints
- `GET /api/sessions` - Get all sessions for user
- `GET /api/sessions/:id` - Get single session by ID
- `POST /api/sessions` - Create new session (admin only)
- `PUT /api/sessions/:id` - Update session (admin only)
- `DELETE /api/sessions/:id` - Delete session (admin only)
- `GET /api/sessions/:sessionId/all-details` - Get all User details (admin only)
- `GET /api/sessions/:sessionId/details` - Get session details for user
- `PUT /api/sessions/:sessionId/details` - Update session details

### Homework Endpoints
- `GET /api/homework` - Get all homework tasks for user
- `GET /api/homework/session/:sessionId` - Get homework by session
- `GET /api/homework/:id` - Get single homework task
- `POST /api/homework` - Create new homework task
- `PUT /api/homework/:id` - Update homework task
- `DELETE /api/homework/:id` - Delete homework task

### Notification Endpoints
- `GET /api/notifications` - Get Notifications
- `POST /api/notifications/homework-reminders` - Create reminder for homework tasks
- `PUT /api/notifications/:homeworkId/read` - Mark notifications as read

## 🚀 Deployment
- Frontend - Vercel
- Backend - Render
- Database - MongoDB Atlas

## 🏁 Getting Started

### Installation:
```bash
# Clone the repository
git clone https://github.com/your-username/mental-health-app.git
cd mental-health-app

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend
npm install
```

### Set up environment variables
- Create `.env` file in backend directory
- Create `.env.local` file in frontend directory

### Start development servers
```bash
# In backend directory
npm run dev

# In frontend directory
npm run dev
```

Access the application at http://localhost:3000

## 🧑 Author
This project is created by [Aniket Kadam](https://github.com/ImAniket10)

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements
- [shadcn/ui](https://ui.shadcn.com/) for the UI components
- [Next.js](https://nextjs.org/) for the frontend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Express.js](https://expressjs.com/) for the backend framework
