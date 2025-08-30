import axios, { type AxiosResponse } from 'axios';

export interface Item {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
}

export interface CreateItemRequest {
  name: string;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

const API_BASE_URL = 'http://localhost:3000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const getItems = async (): Promise<ApiResponse<Item[]>> => {
  try {
    const response: AxiosResponse<ApiResponse<Item[]>> = await apiClient.get('/items');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch items',
        error: error.response?.data?.error || 'NETWORK_ERROR'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
      error: 'UNKNOWN_ERROR'
    };
  }
};

export const createItem = async (itemData: CreateItemRequest): Promise<ApiResponse<Item>> => {
  try {
    const response: AxiosResponse<ApiResponse<Item>> = await apiClient.post('/items', itemData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create item',
        error: error.response?.data?.error || 'NETWORK_ERROR'
      };
    }
    return {
      success: false,
      message: 'An unexpected error occurred',
      error: 'UNKNOWN_ERROR'
    };
  }
};
