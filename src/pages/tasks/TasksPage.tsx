import React from 'react';
import { Box, Typography, Button, Fab, Paper } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { KanbanBoard } from '../../components/tasks/KanbanBoard';
import { TaskForm } from '../../components/tasks/TaskForm';
import { MainLayout } from '../../components/layout/MainLayout';

export const TasksPage: React.FC = () => {
    const [isCreating, setIsCreating] = React.useState(false);

    return (
        <MainLayout>
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1">
                        Mis Tareas
                    </Typography>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setIsCreating(true)}
                    >
                        Nueva Tarea
                    </Button>
                </Box>

                {isCreating && (
                    <Box sx={{ mb: 3 }}>
                        <Paper elevation={3} sx={{ p: 2 }}>
                            <TaskForm onClose={() => setIsCreating(false)} />
                        </Paper>
                    </Box>
                )}

                <KanbanBoard />
            </Box>

            <Fab
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={() => setIsCreating(true)}
            >
                <AddIcon />
            </Fab>
        </MainLayout>
    );
};