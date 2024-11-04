import React, { createContext, useReducer, useCallback } from 'react';
import { ITaskContext, ITaskState, ITask, TaskStatus } from '../interfaces/task.interface';
import { tasksApi } from '../api/tasks.api';

const initialState: ITaskState = {
    tasks: [],
    currentTask: null,
    isLoading: false,
    error: null,
    totalPages: 1,
    currentPage: 1,
};

type TaskAction =
    | { type: 'FETCH_TASKS_START' }
    | { type: 'FETCH_TASKS_SUCCESS'; payload: { tasks: ITask[] } }
    | { type: 'TASK_ERROR'; payload: string }
    | { type: 'CREATE_TASK_SUCCESS'; payload: ITask }
    | { type: 'UPDATE_TASK_SUCCESS'; payload: ITask }
    | { type: 'DELETE_TASK_SUCCESS'; payload: string }
    | { type: 'CLEAR_ERROR' };

const taskReducer = (state: ITaskState, action: TaskAction): ITaskState => {
    switch (action.type) {
        case 'FETCH_TASKS_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'FETCH_TASKS_SUCCESS':
            return {
                ...state,
                isLoading: false,
                tasks: action.payload.tasks,
                error: null,
            };
        case 'TASK_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'CREATE_TASK_SUCCESS':
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
                isLoading: false,
                error: null,
            };
        case 'UPDATE_TASK_SUCCESS':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                    task._id === action.payload._id ? action.payload : task
                ),
                isLoading: false,
                error: null,
            };
        case 'DELETE_TASK_SUCCESS':
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                isLoading: false,
                error: null,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const TaskContext = createContext<ITaskContext | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    const getTasks = useCallback(async () => {
        try {
            dispatch({ type: 'FETCH_TASKS_START' });
            const response = await tasksApi.getTasks();

            dispatch({
                type: 'FETCH_TASKS_SUCCESS',
                payload: {
                    tasks: response,
                }
            });
        } catch (error: any) {
            dispatch({ type: 'TASK_ERROR', payload: error.response?.data?.message || 'Error al obtener las tareas' });
        }
    }, []);

    const createTask = useCallback(async (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => {
        try {
            dispatch({ type: 'FETCH_TASKS_START' });
            const { data } = await tasksApi.createTask(task);

            dispatch({ type: 'CREATE_TASK_SUCCESS', payload: data });
        } catch (error: any) {
            dispatch({ type: 'TASK_ERROR', payload: error.response?.data?.message || 'Error al crear la tarea' });
        }
    }, []);

    const updateTask = useCallback(async (id: string, task: Partial<ITask>) => {
        try {
            dispatch({ type: 'FETCH_TASKS_START' });
            const { data } = await tasksApi.updateTask(id, task);
            dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
        } catch (error: any) {
            dispatch({ type: 'TASK_ERROR', payload: error.response?.data?.message || 'Error al actualizar la tarea' });
        }
    }, []);

    const deleteTask = useCallback(async (id: string) => {
        try {
            dispatch({ type: 'FETCH_TASKS_START' });
            await tasksApi.deleteTask(id);
            dispatch({ type: 'DELETE_TASK_SUCCESS', payload: id });
        } catch (error: any) {
            dispatch({ type: 'TASK_ERROR', payload: error.response?.data?.message || 'Error al eliminar la tarea' });
        }
    }, []);

    const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
        try {
            dispatch({ type: 'FETCH_TASKS_START' });
            const { data } = await tasksApi.updateTaskStatus(id, status);
            dispatch({ type: 'UPDATE_TASK_SUCCESS', payload: data });
        } catch (error: any) {
            dispatch({ type: 'TASK_ERROR', payload: error.response?.data?.message || 'Error al actualizar el estado de la tarea' });
        }
    }, []);

    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    return (
        <TaskContext.Provider
            value={{
                ...state,
                getTasks,
                createTask,
                updateTask,
                deleteTask,
                updateTaskStatus,
                clearError
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};

