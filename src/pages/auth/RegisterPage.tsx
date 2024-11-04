import React from 'react';
import { Container, Paper, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { RegisterForm } from '../../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography component="h1" variant="h5" textAlign="center">
                    Crear cuenta
                </Typography>
                <RegisterForm />
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link component={RouterLink} to="/login" variant="body2">
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

