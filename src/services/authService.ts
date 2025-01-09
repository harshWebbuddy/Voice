import axios from 'axios';

const API_URL = 'http://localhost:3000/auth';

interface AuthResponse {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

interface ResetPasswordResponse {
  message: string;
}

const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(`${API_URL}/login`, { email, password });
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  register: async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(`${API_URL}/register`, userData);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const { data } = await axios.post<{ message: string }>(`${API_URL}/forgot-password`, { email });
    return data;
  },

  resetPassword: async (token: string, password: string): Promise<ResetPasswordResponse> => {
    const { data } = await axios.post<ResetPasswordResponse>(`${API_URL}/reset-password`, {
      token,
      newPassword: password
    });
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    if (token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    }
    return null;
  },

  getToken: () => {
    return localStorage.getItem('token');
  },
};

export default authService; 