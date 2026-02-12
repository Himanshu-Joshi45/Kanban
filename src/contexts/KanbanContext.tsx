import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Task, TaskStatus } from '../types';
import { mockApi } from '../api/mockApi';

interface KanbanContextType {
  tasks: Task[];
  addTask: (title: string) => Promise<void>;
  moveTask: (taskId: string, newStatus: TaskStatus) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  showToast: (message: string, type: 'success' | 'error') => void;
  toast: { message: string; type: 'success' | 'error' } | null;
}

const KanbanContext = createContext<KanbanContextType | undefined>(undefined);

export function KanbanProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('kanban_tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem('kanban_tasks', JSON.stringify(newTasks));
  };

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const addTask = async (title: string) => {
    const tempId = `temp-${Date.now()}`;
    const optimisticTask: Task = {
      id: tempId,
      title,
      status: 'todo',
      createdAt: Date.now(),
    };

    setTasks(prev => [...prev, optimisticTask]);

    const response = await mockApi.addTask(title);

    if (response.success && response.data) {
      setTasks(prev => {
        const newTasks = prev.map(t => (t.id === tempId ? response.data! : t));
        saveTasks(newTasks);
        return newTasks;
      });
      showToast('Task added successfully', 'success');
    } else {
      setTasks(prev => prev.filter(t => t.id !== tempId));
      showToast(response.error || 'Failed to add task', 'error');
    }
  };

  const moveTask = async (taskId: string, newStatus: TaskStatus) => {
    const previousTasks = [...tasks];
    const taskToMove = tasks.find(t => t.id === taskId);

    if (!taskToMove) return;

    const previousStatus = taskToMove.status;

    setTasks(prev => {
      const updated = prev.map(t =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      return updated;
    });

    const response = await mockApi.moveTask(taskId, newStatus);

    if (response.success) {
      setTasks(prev => {
        saveTasks(prev);
        return prev;
      });
      showToast('Task moved successfully', 'success');
    } else {
      setTasks(previousTasks);
      saveTasks(previousTasks);
      showToast(response.error || 'Failed to move task. Reverting changes.', 'error');
    }
  };

  const deleteTask = async (taskId: string) => {
    const previousTasks = [...tasks];

    setTasks(prev => prev.filter(t => t.id !== taskId));

    const response = await mockApi.deleteTask(taskId);

    if (response.success) {
      setTasks(prev => {
        saveTasks(prev);
        return prev;
      });
      showToast('Task deleted successfully', 'success');
    } else {
      setTasks(previousTasks);
      saveTasks(previousTasks);
      showToast(response.error || 'Failed to delete task. Reverting changes.', 'error');
    }
  };

  return (
    <KanbanContext.Provider
      value={{
        tasks,
        addTask,
        moveTask,
        deleteTask,
        showToast,
        toast,
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
}

export function useKanban() {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
}
