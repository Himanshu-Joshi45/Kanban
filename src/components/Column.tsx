import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Task, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';
import { useKanban } from '../contexts/KanbanContext';

interface ColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, status: TaskStatus) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export function Column({ title, status, tasks, onDragOver, onDrop, onDragStart }: ColumnProps) {
  const [showInput, setShowInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const { addTask } = useKanban();

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;

    await addTask(newTaskTitle.trim());
    setNewTaskTitle('');
    setShowInput(false);
  };

  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'from-slate-500 to-slate-600';
      case 'in-progress':
        return 'from-blue-500 to-cyan-500';
      case 'done':
        return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className={`bg-gradient-to-r ${getColumnColor()} rounded-t-xl p-4 shadow-lg`}>
        <h2 className="font-semibold text-white text-lg">{title}</h2>
        <p className="text-white/80 text-sm mt-1">{tasks.length} tasks</p>
      </div>

      <div
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, status)}
        className="flex-1 bg-slate-50 rounded-b-xl p-4 space-y-3 min-h-[400px] border-2 border-dashed border-slate-200"
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDragStart={onDragStart} />
        ))}

        {status === 'todo' && !showInput && (
          <button
            onClick={() => setShowInput(true)}
            className="w-full flex items-center gap-2 px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg border-2 border-dashed border-slate-200 hover:border-blue-300 transition-all"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm font-medium">Add task</span>
          </button>
        )}

        {status === 'todo' && showInput && (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-300">
            <input
              type="text"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddTask();
                if (e.key === 'Escape') {
                  setShowInput(false);
                  setNewTaskTitle('');
                }
              }}
              placeholder="Enter task title..."
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddTask}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-cyan-600 transition-all"
              >
                Add Task
              </button>
              <button
                onClick={() => {
                  setShowInput(false);
                  setNewTaskTitle('');
                }}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
