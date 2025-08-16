import { useState } from "react";
import type { Task } from "../types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTaskStatus } from "../services/api";

interface Props {
  task: Task;
}

export const TaskItem = ({ task }: Props) => {
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: () => updateTaskStatus(task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  return (
    <div className="mb-4 p-4 rounded-md shadow-sm bg-white">
      <div className="flex items-center justify-between">
        <span className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>
          {task.title}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleMutation.mutate()}
            className={`${task.completed ? "text-green-900 bg-green-100": "text-blue-900 bg-blue-100"} text-sm px-3 py-1 cursor-pointer font-medium rounded-md hover:bg-blue-200`}
          >
            {task.completed ? "Undo" : "Complete"}
          </button>
          <button
            onClick={() => deleteMutation.mutate()}
            className="text-sm px-3 py-1 bg-red-100 cursor-pointer text-red-900 font-medium rounded-md  hover:bg-red-200"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDetails((prev) => !prev)}
            className="text-sm px-3 py-1 bg-gray-200 cursor-pointer text-gray-900 font-medium rounded-md  hover:bg-gray-300"
          >
            {showDetails ? "Hide" : "View"}
          </button>
        </div>
      </div>

      {showDetails && (
        <div className="p-5 mt-3 bg-green-50 rounded-md text-sm text-green-950 space-y-5">
          <p>
            <strong>Description:</strong>
            <div>{task.description}</div>
          </p>
          <p>
            <strong>Status:</strong> {task.completed ? "Done" : "Pending"}
          </p>
        </div>
      )}
    </div>
  );
};
