import { useState } from "react";
import type { Task } from "../types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask, updateTaskStatus, updateTask } from "../services/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof schema>;

export const TaskItem = ({ task }: Props) => {
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: task.title,
      description: task.description
    }
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteTask(task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const toggleMutation = useMutation({
    mutationFn: () => updateTaskStatus(task.id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const updateMutation = useMutation({
    mutationFn: (data: FormData) => updateTask(task.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      setIsEditing(false);
    }
  });

  const onSubmit = (data: FormData) => updateMutation.mutate(data);

  return (
    <div className="mb-4 p-4 rounded-md shadow-sm bg-white">
      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <input
            {...register("title")}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

          <textarea
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>
              {task.title}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => toggleMutation.mutate()}
                className={`${task.completed ? "text-green-900 bg-green-100" : "text-blue-900 bg-blue-100"} text-sm px-3 py-1 cursor-pointer font-medium rounded-md hover:bg-blue-200`}
              >
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm px-3 py-1 bg-yellow-100 cursor-pointer text-yellow-900 font-medium rounded-md hover:bg-yellow-200"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate()}
                className="text-sm px-3 py-1 bg-red-100 cursor-pointer text-red-900 font-medium rounded-md hover:bg-red-200"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDetails((prev) => !prev)}
                className="text-sm px-3 py-1 bg-gray-200 cursor-pointer text-gray-900 font-medium rounded-md hover:bg-gray-300"
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
        </>
      )}
    </div>
  );
};
