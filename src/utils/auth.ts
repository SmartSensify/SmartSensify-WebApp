
export const setAuthToken = (token: string, username: string): void => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
};

export const removeAuthToken = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
};

export const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

export const getLoggedUsername = (): string | null => {
    return localStorage.getItem('username');
};

export const isAuthenticated = (): boolean => {
    return !!getAuthToken();
};

export const checkAuthentication = () => {
    if (!isAuthenticated()) {
        removeAuthToken();
        
        return false;
    }
    return true
}