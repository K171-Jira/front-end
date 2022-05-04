import axios from 'axios';
import { API_URL } from '../common/constants';
import SignupData from './SignupData';
import LoginData from './LoginData';
import User from '../users/models/User';
import ChangePasswordRequest from '../users/components/ChangePasswordRequest';
import { userInfo } from 'os';

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

export const saveUser = async (user: User) => {
  let response;
  if (user.id) {
    response = await axios.put(`${API_URL}/users/${user.id}`, user);
  } else {
    response = await axios.post(`${API_URL}/users`, user);
  }

  return response.data;
};

export const changePassword = async (request: ChangePasswordRequest) => {
  let response;
  if (request.id) {
    response = await axios.put(`${API_URL}/users/changePassword/${request.id}`, request);
  } else {
    response = await axios.post(`${API_URL}/users`, request);
  }

  return response.data;
};

export default { signup, login, logout, getCurrentUser, saveUser, changePassword };


