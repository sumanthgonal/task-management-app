'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Task } from '@/types';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth } from 'date-fns';

export default function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const { data: tasks, isLoading } = useQuery<Task[]>({
    queryKey: ['calendarTasks', currentDate],
    queryFn: async () => {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const res = await fetch(
        `/api/tasks?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      if (!res.ok) throw new Error('Failed to fetch calendar tasks');
      return res.json();
    },
  });

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const getTasksForDay = (date: Date) => {
    if (!tasks) return [];
    return tasks.filter(
      (task) => task.dueDate && 
      new Date(task.dueDate).toDateString() === date.toDateString()
    );
  };

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayTasks = getTasksForDay(day);
          return (
            <div
              key={day.toISOString()}
              className={`
                p-2 border rounded-lg min-h-[80px]
                ${isToday(day) ? 'bg-blue-50 border-blue-200' : ''}
                ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : ''}
              `}
            >
              <div className="text-sm font-medium">
                {format(day, 'd')}
              </div>
              {dayTasks.length > 0 && (
                <div className="mt-1">
                  {dayTasks.slice(0, 2).map((task) => (
                    <div
                      key={task.id}
                      className="text-xs truncate text-gray-600"
                    >
                      {task.title}
                    </div>
                  ))}
                  {dayTasks.length > 2 && (
                    <div className="text-xs text-gray-500">
                      +{dayTasks.length - 2} more
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
} 