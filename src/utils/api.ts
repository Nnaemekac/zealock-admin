import type { GeneralStats } from "../types/apiTypes";

const API_BASE = 'https://api.zealock.com';
const API_KEY = '27c2c58f015a3a9ed04202baa5f9c66c86166f29';

/**
 * Fetches general statistics from the Zealock API
 * @returns Promise<GeneralStats>
 * @throws Error if the request fails
 */
export const fetchGeneralStats = async (): Promise<GeneralStats> => {
  try {
    const response = await fetch(`${API_BASE}/root/general/stats?key=${API_KEY}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: GeneralStats = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch data');
    }

    return data;
  } catch (error) {
    console.error('Error fetching general stats:', error);
    throw error;
  }
};

/**
 * Example of additional API functions you might need
 * 
 * export const fetchUserDetails = async (userId: string): Promise<User> => {
 *   const response = await fetch(`${API_BASE}/users/${userId}?key=${API_KEY}`);
 *   return await response.json();
 * }
 * 
 * export const updateItem = async (itemId: string, data: any): Promise<Item> => {
 *   const response = await fetch(`${API_BASE}/items/${itemId}?key=${API_KEY}`, {
 *     method: 'PUT',
 *     headers: {
 *       'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify(data),
 *   });
 *   return await response.json();
 * }
 */