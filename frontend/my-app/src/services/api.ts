import axios from "axios";
import type { Task } from "../types/task";

const api = axios.create({ baseURL: "http://localhost:3000" });

export const getTasks = async (): Promise<Task[]> => {
  const res = await api.get("/tasks");
  return res.data;
};

export const addTask = async (task: { title: string }): Promise<Task> => {
  const res = await api.post("/tasks", task);
  return res.data;
};

export const updateTask = async (id: string, task: { title: string; description: string }): Promise<Task> => {
  const res = await api.put(`/tasks/${id}`, task);
  return res.data;
};
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const updateTaskStatus = async (id: string, ): Promise<Task> => {
  const res = await api.patch(`/tasks/${id}`, { status : 'done' });
  return res.data;
};
