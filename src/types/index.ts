export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate?: Date;
  projectId?: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
} 