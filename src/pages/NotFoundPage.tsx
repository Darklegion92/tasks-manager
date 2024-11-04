import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                }}
            >
                <Typography variant="h1" component="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h5" component="h2" gutterBottom>
                    Página no encontrada
                </Typography>
                <Typography color="text.secondary" align="center" sx={{ mb: 4 }}>
                    Lo sentimos, la página que estás buscando no existe.
                </Typography>
                <Button variant="contained" onClick={() => navigate('/')}>
                    Volver al inicio
                </Button>
            </Box>
        </Container>
    );
};