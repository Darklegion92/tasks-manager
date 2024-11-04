import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { TasksPage } from '../pages/tasks/TasksPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export interface RouteConfig {
    path: string;
    component: React.ComponentType;
    isPrivate?: boolean;
}

export const routes: RouteConfig[] = [
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '/register',
        component: RegisterPage,
    },
    {
        path: '/',
        component: TasksPage,
        isPrivate: true,
    },
    {
        path: '*',
        component: NotFoundPage,
    },
];

