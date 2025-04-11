import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userType: 'CLIENT' | 'OWNER';
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', data);
  // Store tokens
  localStorage.setItem('access_token', response.data.access_token);
  localStorage.setItem('refresh_token', response.data.refresh_token);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Cars
export interface CarFilters {
  search?: string;
  location?: string;
  transmission?: string;
  fuelType?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'year';
  direction?: 'asc' | 'desc';
  page?: number;
  size?: number;
}

export const getCars = async (filters?: CarFilters) => {
  const response = await api.get('/cars', { params: filters });
  return response.data;
};

export const getCarById = async (id: string) => {
  const response = await api.get(`/cars/${id}`);
  return response.data;
};

export const createCar = async (carData: FormData) => {
  const response = await api.post('/cars', carData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// Bookings
export interface BookingData {
  carId: string;
  startDate: string;
  endDate: string;
}

export const createBooking = async (data: BookingData) => {
  const response = await api.post('/bookings', data);
  return response.data;
};

export const getCarBookings = async (carId: string) => {
  const response = await api.get(`/bookings/car/${carId}/occupied`);
  return response.data;
};

export const getUserBookings = async () => {
  const response = await api.get('/bookings/user');
  return response.data;
};

// Reviews
export interface ReviewData {
  carId: string;
  rating: number;
  comment: string;
}

export const createReview = async (data: ReviewData) => {
  const response = await api.post('/reviews', data);
  return response.data;
};

export const getCarReviews = async (carId: string) => {
  const response = await api.get(`/reviews/car/${carId}`);
  return response.data;
};

export const getImageUrl = (carId: string, filename: string) => {
  return `${API_URL}/images/${carId}/${filename}`;
};

export default api;