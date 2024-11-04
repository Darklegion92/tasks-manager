import { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks debe ser usado dentro de un TaskProvider');
    }
    return context;
};

