import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../services/api";
import { TaskItem } from "./TaskItem";

export const TaskList = () => {
  const { data: tasks, isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading tasks.</p>;

  return (
    <div className="mt-8">
      {tasks?.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};
