import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button } from '@mui/material';
import { formatDate } from '@/libs/formats';
import { ITask, TaskStatus } from '../../interfaces/task.interface';
import { useTasks } from '../../hooks/useTasks';

const schema = yup.object({
    title: yup.string().required('El título es requerido'),
    description: yup.string().required('La descripción es requerida'),
    dueDate: yup.string().required('El tiempo de terminación es obligatorio'),
}).required();

interface TaskFormProps {
    task?: ITask;
    onClose?: () => void;
}

type TaskFormData = Pick<ITask, 'title' | 'description' | 'dueDate'>;

export const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
    const { createTask, updateTask } = useTasks();
    const { register, handleSubmit, formState: { errors } } = useForm<TaskFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: task?.title ?? '',
            description: task?.description ?? '',
            dueDate: formatDate(task?.dueDate ?? ''),
        }
    });

    const onSubmit = async (data: any) => {
        if (task) {
            await updateTask(task._id ?? '', { status: TaskStatus.TODO, ...data });
        } else {
            await createTask({ status: TaskStatus.TODO, ...data });
        }
        onClose?.();
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ p: 2 }}>
            <TextField
                fullWidth
                margin="normal"
                label="Título"
                {...register('title')}
                error={!!errors.title}
                helperText={errors.title?.message}
            />
            <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                multiline
                rows={3}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
            />
            <TextField
                fullWidth
                label="Fecha de vencimiento"
                InputLabelProps={{ shrink: true }}
                margin="normal"
                {...register('dueDate')}
                error={!!errors.dueDate}
                helperText={errors.dueDate?.message}
                type="date"

            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    {task ? 'Actualizar' : 'Crear'}
                </Button>
                {onClose && (
                    <Button
                        variant="outlined"
                        onClick={onClose}
                    >
                        Cancelar
                    </Button>
                )}
            </Box>
        </Box>
    );
};