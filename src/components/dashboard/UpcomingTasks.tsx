'use client';

import { useQuery } from '@tanstack/react-query';
import { Task } from '@/types';
import TaskCard from '../TaskCard';

export default function UpcomingTasks() {
  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['upcomingTasks'],
    queryFn: async () => {
      const res = await fetch('/api/tasks?upcoming=true');
      if (!res.ok) throw new Error('Failed to fetch upcoming tasks');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!tasks?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No upcoming tasks
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {tasks.slice(0, 5).map((task) => (
        <TaskCard key={task.id} task={task} compact />
      ))}
      {tasks.length > 5 && (
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-800">
            View all {tasks.length} tasks
          </button>
        </div>
      )}
    </div>
  );
} 