import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

// Configure axios defaults
axios.defaults.withCredentials = true;

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthResponse {
  access_token: string;
  user: User;
}

interface ResetPasswordResponse {
  message: string;
}

export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<User> => {
  try {
    console.log('Sending registration request with data:', { email, firstName, lastName });
    const response = await axios.post<User>(`${API_URL}/register`, {
      email,
      password,
      firstName,
      lastName
    });
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Registration error:', error.response?.data || error);
    throw error;
  }
};

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const forgotPassword = async (email: string): Promise<{ message: string }> => {
  const response = await axios.post<{ message: string }>(`${API_URL}/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (
  token: string,
  newPassword: string
): Promise<ResetPasswordResponse> => {
  const response = await axios.post<ResetPasswordResponse>(`${API_URL}/reset-password`, {
    token,
    newPassword,
  });
  return response.data;
}; 