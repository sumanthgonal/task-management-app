import { create } from 'zustand';

interface Task {
  id: number;
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate?: Date;
}

interface Project {
  id: number;
  name: string;
  description?: string;
}

interface Store {
  tasks: Task[];
  projects: Project[];
  setTasks: (tasks: Task[]) => void;
  setProjects: (projects: Project[]) => void;
  addTask: (task: Task) => void;
  addProject: (project: Project) => void;
  updateTask: (id: number, task: Partial<Task>) => void;
  deleteTask: (id: number) => void;
}

export const useStore = create<Store>((set) => ({
  tasks: [],
  projects: [],
  setTasks: (tasks) => set({ tasks }),
  setProjects: (projects) => set({ projects }),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
  updateTask: (id, updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
})); 