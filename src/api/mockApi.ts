import type { Task, TaskStatus, ApiResponse } from '../types';

const MOCK_DELAY = 1500;
const FAILURE_RATE = 0.2;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const shouldFail = () => Math.random() < FAILURE_RATE;

export const mockApi = {
  addTask: async (title: string): Promise<ApiResponse<Task>> => {
    await delay(MOCK_DELAY);

    if (shouldFail()) {
      return { success: false, error: 'Failed to add task' };
    }

    const newTask: Task = {
      id: `task-${Date.now()}-${Math.random()}`,
      title,
      status: 'todo',
      createdAt: Date.now(),
    };

    return { success: true, data: newTask };
  },

  moveTask: async (
    _taskId: string,
    _newStatus: TaskStatus
  ): Promise<ApiResponse<null>> => {
    await delay(MOCK_DELAY);

    if (shouldFail()) {
      return { success: false, error: 'Failed to move task' };
    }

    return { success: true };
  },

  deleteTask: async (_taskId: string): Promise<ApiResponse<null>> => {
    await delay(MOCK_DELAY);

    if (shouldFail()) {
      return { success: false, error: 'Failed to delete task' };
    }

    return { success: true };
  },
};
