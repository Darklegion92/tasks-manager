import { axiosInstance } from './axios.config';
import { ITask, TaskStatus } from '../interfaces/task.interface';

export const tasksApi = {
    getTasks: async () => {
        const response = await axiosInstance.get<ITask[]>(
            `/tasks`
        );

        return response.data;
    },

    createTask: async (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
        const response = await axiosInstance.post<ITask>('/tasks', task);
        return response;
    },

    updateTask: async (id: string, task: Partial<ITask>) => {
        const response = await axiosInstance.put<ITask>(`/tasks/${id}`, task);
        return response;
    },

    deleteTask: async (id: string) => {
        const response = await axiosInstance.delete<void>(`/tasks/${id}`);
        return response;
    },

    updateTaskStatus: async (id: string, status: TaskStatus) => {
        const response = await axiosInstance.patch<ITask>(`/tasks/${id}/status`, { status });
        return response;
    }
};