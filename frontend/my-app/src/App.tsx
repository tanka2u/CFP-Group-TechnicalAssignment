import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList.tsx";

function App() {
  return (
    <div className="p-20 bg-blue-50 h-screen">
      <h1 className="text-lg font-semibold text-center">Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;
