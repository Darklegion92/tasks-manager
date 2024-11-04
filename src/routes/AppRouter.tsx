import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthGuard } from '../components/auth/AuthGuard';
import { routes } from './routes.config';

export const AppRouter: React.FC = () => {
    return (
        <Routes>
            {routes.map(({ path, component: Component, isPrivate }) => (
                <Route
                    key={path}
                    path={path}
                    element={
                        isPrivate ? (
                            <AuthGuard>
                                <Component />
                            </AuthGuard>
                        ) : (
                            <Component />
                        )
                    }
                />
            ))}
        </Routes>
    );
};