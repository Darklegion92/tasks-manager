import { axiosInstance } from './axios.config';
import { ILoginCredentials, IRegisterCredentials } from '../interfaces/auth.interface';

export const authApi = {
    login: async (credentials: ILoginCredentials) => {
        const response = await axiosInstance.post('/auth/login', credentials);
        return response.data;
    },

    register: async (credentials: IRegisterCredentials) => {
        const response = await axiosInstance.post('/auth/register', credentials);
        return response.data;
    },

    getCurrentUser: async () => {
        const response = await axiosInstance.get('/auth/me');
        return response.data;
    }
};

