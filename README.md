Task Manager App

A simple Task Manager built with React + TypeScript (Frontend) and
Express + TypeScript (Backend).
It allows users to add, view, complete/undo, and delete tasks.

------------------------------------------------------------------------

🚀 Features

-   Add new tasks with title & description
-   View all tasks
-   Mark tasks as complete or undo
-   Delete tasks
-   Persistent task state on backend (in-memory for now)
-   Validation with Zod
-   Data fetching & mutations with React Query

------------------------------------------------------------------------

🛠️ Tech Stack

Frontend

-   React + TypeScript
-   React Hook Form + Zod
-   React Query
-   Tailwind CSS
-   Axios

Backend

-   Express + TypeScript
-   Zod for validation
-   UUID for unique IDs

------------------------------------------------------------------------

📂 Project Structure

    backend/
      ├── routes/tasks.ts
      ├── services/taskServices.ts
      ├── types/task.ts
      └── index.ts
    frontend/
      ├── components/
      │   ├── TaskForm.tsx
      │   ├── TaskItem.tsx
      │   └── TaskList.tsx
      ├── services/api.ts
      ├── types/task.ts
      └── App.tsx

------------------------------------------------------------------------

⚡ Getting Started

1. Clone the repository

    git clone https://github.com/your-username/task-manager.git
    cd task-manager

2. Run Backend

    cd backend
    npm install
    npm run dev

Backend runs on http://localhost:3000

3. Run Frontend

    cd frontend
    npm install
    npm run dev

Frontend runs on http://localhost:5173

------------------------------------------------------------------------

📌 Notes

-   Backend uses in-memory storage (tasks are lost on server restart).
-   CORS is configured to allow frontend requests from
    http://localhost:5173.

------------------------------------------------------------------------

🎯 Future Improvements

-   Connect to a database (MongoDB / PostgreSQL)
-   User authentication
-   Task due dates & priority levels
-   Deploy to cloud (Vercel + Render/Heroku)


