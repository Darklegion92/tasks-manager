import React, { createContext, useReducer, useCallback } from 'react';
import { IAuthContext, IAuthState, ILoginCredentials, IRegisterCredentials } from '../interfaces/auth.interface';
import { authApi } from '../api/auth.api';

const initialState: IAuthState = {
    user: null,
    token: localStorage.getItem('token'),
    isAuthenticated: Boolean(localStorage.getItem('token')),
    isLoading: false,
    error: null,
};

type AuthAction =
    | { type: 'AUTH_START' }
    | { type: 'AUTH_SUCCESS'; payload: { user: any; token: string } }
    | { type: 'AUTH_ERROR'; payload: string }
    | { type: 'AUTH_LOGOUT' }
    | { type: 'CLEAR_ERROR' };

const authReducer = (state: IAuthState, action: AuthAction): IAuthState => {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        case 'AUTH_LOGOUT':
            return {
                ...initialState,
                token: null,
                isAuthenticated: false,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    const clearError = useCallback(() => {
        dispatch({ type: 'CLEAR_ERROR' });
    }, []);

    const register = useCallback(async (credentials: IRegisterCredentials): Promise<void> => {
        try {
            dispatch({ type: 'AUTH_START' });
            const response = await authApi.register(credentials);

            if (response?.data.user) {
                const { user, token } = response.data;
                if (token) {
                    localStorage.setItem('token', token);
                }
                dispatch({ type: 'AUTH_SUCCESS', payload: { user, token: token || '' } });
            } else {
                throw new Error('Respuesta inválida del servidor');
            }
        } catch (error: any) {
            console.error('Error detallado:', error);
            const errorMessage = error.response?.data?.message || 'Error en el registro';
            dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
            throw new Error(errorMessage);
        }
    }, []);

    const login = useCallback(async (credentials: ILoginCredentials): Promise<void> => {
        try {
            dispatch({ type: 'AUTH_START' });
            console.log('Iniciando login...');

            const response = await authApi.login(credentials);
            console.log('Respuesta del servidor:', response);

            if (response?.token && response.user) {
                localStorage.setItem('token', response.token);
                dispatch({
                    type: 'AUTH_SUCCESS',
                    payload: {
                        user: response.user,
                        token: response.token
                    }
                });
                console.log('Login exitoso');
            } else {
                throw new Error('Respuesta del servidor inválida');
            }
        } catch (error: any) {
            console.error('Error en login:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Error en el inicio de sesión';
            dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
            throw new Error(errorMessage);
        }
    }, []);


    const logout = useCallback(() => {
        localStorage.removeItem('token');
        dispatch({ type: 'AUTH_LOGOUT' });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                register,
                logout,
                clearError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

