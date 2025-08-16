import type { ReactNode } from "react";

export interface Task {
  description: ReactNode;
  id: string;
  title: string;
  completed: boolean;
}
