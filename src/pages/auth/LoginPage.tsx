import React from 'react';
import { Container, Paper, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
                <Typography component="h1" variant="h5" textAlign="center">
                    Iniciar sesión
                </Typography>
                <LoginForm />
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Link component={RouterLink} to="/register" variant="body2">
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};