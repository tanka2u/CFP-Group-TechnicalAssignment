import express from "express";
import { z } from "zod";
import { createTask, deleteTask, getAllTasks, updateTaskStatus, updateTask } from "../services/taskServices";
const cors = require('cors');


const router = express.Router();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH', 'UPDATE'],      // Allow only these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true              // Allow cookies/auth headers
};

// Apply CORS to all routes in this router
router.use(cors(corsOptions));

const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
});

const statusSchema = z.object({
  status: z.enum(["pending", "done"]),
});

// GET /tasks
router.get("/", (req, res) => {
  res.json(getAllTasks());
});

// POST /tasks
router.post("/", (req, res) => {
  const result = taskSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);

  const task = createTask(result.data.title, result.data.description);
  res.status(201).json(task);
});

// DELETE /tasks/:id
router.delete("/:id", (req, res) => {
  const success = deleteTask(req.params.id);
  if (!success) return res.status(404).json({ error: "Task not found" });
  res.status(204).send();
});

// PATCH /tasks/:id
router.patch("/:id", (req, res) => {
  const result = statusSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);

  const task = updateTaskStatus(req.params.id, result.data.status);
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

// PUT /tasks/:id
router.put("/:id", (req, res) => {
  const result = taskSchema.safeParse(req.body);
  if (!result.success) return res.status(400).json(result.error);

  const task = updateTask(req.params.id, {
    title: result.data.title,
    description: result.data.description
  });
  
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

export default router;
