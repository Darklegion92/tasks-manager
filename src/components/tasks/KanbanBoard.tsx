import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { TaskColumn } from './TaskColumn';
import { TaskStatus } from '../../interfaces/task.interface';
import { useTasks } from '../../hooks/useTasks';
import { usePagination } from '../../hooks/usePagination';

export const KanbanBoard: React.FC = () => {
    const { tasks, getTasks, updateTaskStatus, totalPages } = useTasks();
    const { currentPage } = usePagination({
        totalPages,
        onChange: (page) => {
            getTasks(page)
        }
    });

    useEffect(() => {
        getTasks(currentPage);
    }, [getTasks, currentPage]);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const newStatus = destination.droppableId as TaskStatus;
        updateTaskStatus(draggableId, newStatus);
    };

    const getTasksByStatus = (status: TaskStatus) => {
        return tasks?.filter(task => task?.status === status);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <TaskColumn
                            title="Por Hacer"
                            status={TaskStatus.TODO}
                            tasks={getTasksByStatus(TaskStatus.TODO)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TaskColumn
                            title="En Progreso"
                            status={TaskStatus.IN_PROGRESS}
                            tasks={getTasksByStatus(TaskStatus.IN_PROGRESS)}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TaskColumn
                            title="Completado"
                            status={TaskStatus.DONE}
                            tasks={getTasksByStatus(TaskStatus.DONE)}
                        />
                    </Grid>
                </Grid>
            </Box>
        </DragDropContext>
    );
};