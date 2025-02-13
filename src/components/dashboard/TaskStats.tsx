'use client';

import { useQuery } from '@tanstack/react-query';

interface TaskStats {
  total: number;
  completed: number;
  inProgress: number;
  upcoming: number;
}

export default function TaskStats() {
  const { data: stats, isLoading } = useQuery<TaskStats>({
    queryKey: ['taskStats'],
    queryFn: async () => {
      const res = await fetch('/api/tasks/stats');
      if (!res.ok) throw new Error('Failed to fetch task stats');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  const statCards = [
    { title: 'Total Tasks', value: stats?.total || 0, color: 'bg-blue-500' },
    { title: 'Completed', value: stats?.completed || 0, color: 'bg-green-500' },
    { title: 'In Progress', value: stats?.inProgress || 0, color: 'bg-yellow-500' },
    { title: 'Upcoming', value: stats?.upcoming || 0, color: 'bg-purple-500' },
  ];

  return (
    <>
      {statCards.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.color} rounded-lg shadow p-6 text-white`}
        >
          <h3 className="text-lg font-medium">{stat.title}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </>
  );
} 