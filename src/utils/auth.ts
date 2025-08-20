
const ZEALOCK_API_KEY = import.meta.env.VITE_AUTH_KEY;
const AUTH_KEY = 'zealock_auth_token';

export const isAuthenticated = (): boolean => {
  const authToken = localStorage.getItem(AUTH_KEY);
  return authToken === ZEALOCK_API_KEY;
};

export const login = (key: string): boolean => {
  if (!key || typeof key !== 'string') {
    return false;
  }

  if (key === ZEALOCK_API_KEY) {
    localStorage.setItem(AUTH_KEY, key);
    return true;
  }
  return false;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_KEY);
};

export const validateApiKeyFormat = (key: string): boolean => {
  return typeof key === 'string' && key.length >= 30 && key.length <= 100;
};

export const isAuthExpired = (): boolean => {
  return false;
};

export const refreshAuth = async (): Promise<boolean> => {
  return true;
};