import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { ILoginCredentials } from '../../interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    email: yup
        .string()
        .email('Ingrese un email válido')
        .required('El email es requerido'),
    password: yup
        .string()
        .required('La contraseña es requerida'),
}).required();

export const LoginForm: React.FC = () => {
    const { login, error, isLoading, clearError, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<ILoginCredentials>({
        resolver: yupResolver(schema)
    });

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data: ILoginCredentials) => {
        try {
            clearError();
            await login(data);
        } catch (err) {
            console.error('Error al iniciar sesión:', err);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>
                    {error}
                </Alert>
            )}

            <TextField
                margin="normal"
                fullWidth
                label="Email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
            />

            <TextField
                margin="normal"
                fullWidth
                label="Contraseña"
                type="password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={isLoading}
            >
                {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
        </Box>
    );
};