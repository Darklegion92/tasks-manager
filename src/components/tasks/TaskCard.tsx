import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { Draggable } from 'react-beautiful-dnd';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowForwardIos as ArrowForwardIosIcon } from '@mui/icons-material';
import { ITask, TaskStatus } from '../../interfaces/task.interface';
import { useTasks } from '../../hooks/useTasks';
import { TaskForm } from './TaskForm';
import { formatDate } from '@/libs/formats';

interface TaskCardProps {
    task: ITask;
    index: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, index }) => {
    const { deleteTask, updateTask } = useTasks();
    const [isEditing, setIsEditing] = useState(false);

    const handleDelete = () => {
        if (window.confirm('¿Está seguro de eliminar esta tarea?')) {
            deleteTask(task._id ?? '');
        }
    };

    const handleNext = (status: TaskStatus) => {
        if (window.confirm('¿Está seguro de actualizar la tarea?')) {
            updateTask(task._id ?? '', { status: nextStatus(status) });
        }
    };

    const nextStatus = (status: TaskStatus) => {

        switch (status) {
            case TaskStatus.IN_PROGRESS:
                return TaskStatus.DONE
            case TaskStatus.TODO:
                return TaskStatus.IN_PROGRESS
            default:
                break;
        }

        return status;
    }

    return (
        <Draggable draggableId={task._id ?? ''} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card sx={{ mb: 2 }}>
                        {isEditing ? (
                            <TaskForm
                                task={task}
                                onClose={() => setIsEditing(false)}
                            />
                        ) : (
                            <CardContent>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="h6" component="div">
                                        {task.title}
                                    </Typography>
                                    <Box>
                                        <IconButton size="small" onClick={() => setIsEditing(true)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton size="small" onClick={handleDelete}>
                                            <DeleteIcon />
                                        </IconButton>
                                        {task.status !== TaskStatus.DONE && <IconButton size="small" onClick={() => handleNext(task.status)}>
                                            <ArrowForwardIosIcon />
                                        </IconButton>}
                                    </Box>
                                </Box>
                                <Typography variant="body2" color="text.secondary">
                                    {task.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {formatDate(task.dueDate)}
                                </Typography>
                            </CardContent>
                        )}
                    </Card>
                </div>
            )}
        </Draggable>
    );
};

