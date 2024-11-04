import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, TextField, Button, Alert } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { IRegisterCredentials } from '../../interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
    username: yup
        .string()
        .min(3, 'El nombre de usuario debe tener al menos 3 caracteres')
        .required('El nombre de usuario es requerido'),
    email: yup
        .string()
        .email('Ingrese un email válido')
        .required('El email es requerido'),
    password: yup
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'La contraseña debe contener al menos una mayúscula, una minúscula y un número')
        .required('La contraseña es requerida'),
}).required();

export const RegisterForm: React.FC = () => {
    const { register: registerUser, error, isLoading, clearError, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IRegisterCredentials>({
        resolver: yupResolver(schema)
    });

    React.useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (data: IRegisterCredentials) => {
        try {
            await registerUser(data);
        } catch (error) {
            console.error('Error en registro:', error);
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
                label="Nombre de usuario"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
            />

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
                {isLoading ? 'Registrando...' : 'Registrarse'}
            </Button>
        </Box>
    );
};
