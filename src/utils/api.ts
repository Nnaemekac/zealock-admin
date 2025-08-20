import type { GeneralStats } from "../types/apiTypes";

const API_BASE = 'https://api.zealock.com';
const API_KEY = import.meta.env.VITE_API_KEY;

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
