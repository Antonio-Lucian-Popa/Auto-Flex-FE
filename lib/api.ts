import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_PATH } from './constant';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';
const KEYCLOAK_URL = process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080/realms/autoflex';
const CLIENT_ID = 'autoflex-client';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface JwtPayload {
  exp: number;
}

// Verifică dacă token-ul a expirat
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
};

// Reînnoiește token-ul folosind refresh token direct la Keycloak
const refreshAccessToken = async (): Promise<string> => {
  try {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('client_id', CLIENT_ID);
    params.append('refresh_token', refreshToken);

    const response = await axios.post(
      `${KEYCLOAK_URL}/protocol/openid-connect/token`,
      params,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const { access_token, refresh_token } = response.data;
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);

    return access_token;
  } catch (error) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    throw error;
  }
};

// Add auth token to requests
api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('access_token');

  if (token && isTokenExpired(token)) {
    try {
      token = await refreshAccessToken();
    } catch (error) {
      // Token refresh failed, redirect to login
      window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/login`;
      return Promise.reject(error);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    console.log('Error config:', originalRequest);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const token = await refreshAccessToken();
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh fails
        window.location.href = `${process.env.NEXT_PUBLIC_BASE_PATH}/auth/login`;
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Auth
export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userRole: 'CLIENT' | 'OWNER';
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

export const checkAuth = () => {
  const token = localStorage.getItem('access_token');
  return !!token && !isTokenExpired(token);
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