import express from "express";
import tasksRouter from "./routes/tasks";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
