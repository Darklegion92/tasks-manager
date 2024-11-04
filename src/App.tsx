import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './contexts/AuthContext';
import { TaskProvider } from './contexts/TaskContext';
import { AppRouter } from './routes/AppRouter';
import { theme } from './styles/theme';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <TaskProvider>
                    <BrowserRouter>
                        <AppRouter />
                    </BrowserRouter>
                </TaskProvider>
            </AuthProvider>
        </ThemeProvider>
    );
};

export default App;