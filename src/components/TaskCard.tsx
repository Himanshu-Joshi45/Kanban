
import { Trash2, GripVertical } from 'lucide-react';
import type { Task } from '../types';
import { useKanban } from '../contexts/KanbanContext';

interface TaskCardProps {
  task: Task;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export function TaskCard({ task, onDragStart }: TaskCardProps) {
  const { deleteTask } = useKanban();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className="group bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all cursor-move border border-slate-200 hover:border-blue-300"
    >
      <div className="flex items-start gap-3">
        <GripVertical className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <p className="text-sm text-slate-800 break-words">{task.title}</p>
        </div>
        <button
          onClick={handleDelete}
          className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1 rounded hover:bg-red-50"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
