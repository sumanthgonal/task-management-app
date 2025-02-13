import { Suspense } from 'react';
import TaskStats from '@/components/dashboard/TaskStats';
import UpcomingTasks from '@/components/dashboard/UpcomingTasks';
import ProjectProgress from '@/components/dashboard/ProjectProgress';
import CalendarWidget from '@/components/dashboard/CalendarWidget';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <Suspense fallback={<LoadingSpinner />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <TaskStats />
        </div>
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Upcoming Tasks</h2>
              <UpcomingTasks />
            </div>
          </div>
        </Suspense>

        <Suspense fallback={<LoadingSpinner />}>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900">Project Progress</h2>
              <ProjectProgress />
            </div>
          </div>
        </Suspense>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-medium text-gray-900">Calendar</h2>
            <CalendarWidget />
          </div>
        </div>
      </Suspense>
    </div>
  );
} 