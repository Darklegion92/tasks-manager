import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Droppable } from 'react-beautiful-dnd';
import { TaskCard } from './TaskCard';
import { ITask, TaskStatus } from '../../interfaces/task.interface';

interface TaskColumnProps {
    title: string;
    status: TaskStatus;
    tasks: ITask[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, status, tasks }) => {
    return (
        <Paper
            sx={{
                p: 2,
                height: '100%',
                backgroundColor: 'background.default'
            }}
        >
            <Typography variant="h6" gutterBottom>
                {title} ({tasks?.length})
            </Typography>
            <Droppable droppableId={status}>
                {(provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{ minHeight: '500px' }}
                    >
                        {tasks?.map((task, index) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </Paper>
    );
};