import React from 'react';
import { Box, Container } from '@mui/material';
import { Navbar } from './Navbar';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <Container component="main" sx={{ flex: 1, py: 4 }}>
                {children}
            </Container>
        </Box>
    );
};

