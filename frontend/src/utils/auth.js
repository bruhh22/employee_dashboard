import { jwtDecode } from 'jwt-decode';

export const setToken = (token) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('token', token);
    }
};

export const getToken = () => {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null;
};

export const removeToken = () => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
    }
};

export const getUser = () => {
    const token = getToken();
    if (!token) return null;
    try {
        return jwtDecode(token);
    } catch (e) {
        return null;
    }
};

export const isAuthenticated = () => {
    const user = getUser();
    return !!user;
};