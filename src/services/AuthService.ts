import axios from "axios";

const API_URL = "https://dummyjson.com/auth";

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  token: string;
  refreshToken: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<User> {
    const response = await axios.post(`${API_URL}/login`, credentials);
    const { id, email, username, firstName, lastName, token, refreshToken }: User = response.data;
    return { id, email, username, firstName, lastName, token, refreshToken };
  }

  async logout(): Promise<void> {
    // Implement logout logic (e.g., invalidate token on the server)
    await axios.post(`${API_URL}/logout`);
  }
}

export default new AuthService();
