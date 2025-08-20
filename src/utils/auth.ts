/**
 * Authentication utilities for Zealock Admin Dashboard
 * Handles API key authentication and session management
 */

const ZEALOCK_API_KEY = '27c2c58f015a3a9ed04202baa5f9c66c86166f29';
const AUTH_KEY = 'zealock_auth_token';

/**
 * Checks if user is currently authenticated
 * @returns boolean - true if authenticated, false otherwise
 */
export const isAuthenticated = (): boolean => {
  // Check if we have a valid auth token in localStorage
  const authToken = localStorage.getItem(AUTH_KEY);
  return authToken === ZEALOCK_API_KEY;
};

/**
 * Attempts to log in with provided API key
 * @param key - The API key to validate
 * @returns boolean - true if login successful, false otherwise
 */
export const login = (key: string): boolean => {
  // Basic validation
  if (!key || typeof key !== 'string') {
    return false;
  }

  // In a real app, you might want to hash/encrypt the key before storage
  if (key === ZEALOCK_API_KEY) {
    localStorage.setItem(AUTH_KEY, key);
    return true;
  }
  return false;
};

/**
 * Logs out the current user by clearing authentication data
 */
export const logout = (): void => {
  localStorage.removeItem(AUTH_KEY);
  // You might want to add redirect logic here or in the component
};

/**
 * Gets the current authentication token
 * @returns string | null - The auth token or null if not authenticated
 */
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_KEY);
};

/**
 * Validates an API key format (basic example)
 * @param key - The API key to validate
 * @returns boolean - true if key appears valid
 */
export const validateApiKeyFormat = (key: string): boolean => {
  // Basic format validation - adjust according to your API key requirements
  return typeof key === 'string' && key.length >= 30 && key.length <= 100;
};

/**
 * Checks if authentication is expired (placeholder implementation)
 * @returns boolean - true if expired
 */
export const isAuthExpired = (): boolean => {
  // In a real implementation, you might check token expiration
  return false;
};

/**
 * Refreshes authentication (placeholder implementation)
 * @returns Promise<boolean> - true if refresh successful
 */
export const refreshAuth = async (): Promise<boolean> => {
  // In a real implementation, you might refresh tokens here
  return true;
};