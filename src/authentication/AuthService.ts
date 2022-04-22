import axios from 'axios';
import { API_URL } from '../common/constants';
import SignupData from './SignupData';
import LoginData from './LoginData';

export const signup = async (signupData: SignupData) => {
  const response = await axios.post(`${API_URL}/users/register`, signupData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const login = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/users/login`, loginData);
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  if (localStorage.getItem('user')) {
    return JSON.parse(localStorage.getItem('user')!);
  }
  return null;
};

export default { signup, login, logout, getCurrentUser };
