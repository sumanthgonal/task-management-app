'use client';

import { useQuery } from '@tanstack/react-query';
import { Project } from '@/types';

interface ProjectWithProgress extends Project {
  totalTasks: number;
  completedTasks: number;
}

export default function ProjectProgress() {
  const { data: projects, isLoading } = useQuery<ProjectWithProgress[]>({
    queryKey: ['projectsProgress'],
    queryFn: async () => {
      const res = await fetch('/api/projects/progress');
      if (!res.ok) throw new Error('Failed to fetch project progress');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;

  if (!projects?.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No active projects
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {projects.map((project) => {
        const progress = project.totalTasks 
          ? Math.round((project.completedTasks / project.totalTasks) * 100)
          : 0;

        return (
          <div key={project.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{project.name}</h3>
              <span className="text-sm text-gray-500">
                {progress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-sm text-gray-500">
              {project.completedTasks} of {project.totalTasks} tasks completed
            </div>
          </div>
        );
      })}
    </div>
  );
} 