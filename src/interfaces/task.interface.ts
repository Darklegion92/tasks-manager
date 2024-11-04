export interface ITask {
    _id?: string;
    title: string;
    status: TaskStatus;
    description: string;
    dueDate: string;
    userId: string;
    createdAt?: string;
    updatedAt?: string;
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export interface ITaskState {
    tasks: ITask[];
    currentTask: ITask | null;
    isLoading: boolean;
    error: string | null;
    totalPages: number;
    currentPage: number;
}

export interface ITaskContext extends ITaskState {
    getTasks: (page: number) => Promise<void>;
    createTask: (task: Omit<ITask, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
    updateTask: (id: string, task: Partial<ITask>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
    clearError: () => void;
}

