import { Task } from '@/types';
import { useStore } from '@/store/useStore';

interface TaskCardProps {
  task: Task;
}

export default function TaskCard({ task }: TaskCardProps) {
  const updateTask = useStore((state) => state.updateTask);
  const deleteTask = useStore((state) => state.deleteTask);

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  const statusColors = {
    pending: 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-600 hover:text-red-800"
          >
            🗑️
          </button>
          <button
            onClick={() => {
              // Open edit modal (to be implemented)
            }}
            className="text-blue-600 hover:text-blue-800"
          >
            ✏️
          </button>
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-4">
        <span className={`px-2 py-1 rounded-full text-sm ${priorityColors[task.priority as keyof typeof priorityColors]}`}>
          {task.priority}
        </span>
        <span className={`px-2 py-1 rounded-full text-sm ${statusColors[task.status as keyof typeof statusColors]}`}>
          {task.status}
        </span>
        {task.dueDate && (
          <span className="text-sm text-gray-600">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
} 