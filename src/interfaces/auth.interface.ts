export interface IUser {
    _id: string;
    username: string;
    email: string;
    token: string;
    user: string;
}

export interface ILoginCredentials {
    email: string;
    password: string;
}

export interface IRegisterCredentials extends ILoginCredentials {
    username: string;
}

export interface IAuthState {
    user: IUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface IAuthContext extends IAuthState {
    login: (credentials: ILoginCredentials) => Promise<void>;
    register: (credentials: IRegisterCredentials) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}

export interface IAuthResponse {
    user: IUser;
    token: string;
}

export interface IRegisterResponse {
    _id: string;
    username: string;
    email: string;
}
