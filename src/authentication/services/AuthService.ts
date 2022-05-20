import axios from 'axios';
import { API_URL } from '../../common/constants';
import SignupData from '../models/SignupData';
import LoginData from '../models/LoginData';
import User from '../../users/models/User';
import ChangePasswordRequest from '../../users/components/ChangePasswordRequest';

export const signup = async (signupData: SignupData) => {
  const response = await axios.post(`${API_URL}/users/register`, signupData);
  return response.data;
};

export const login = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/users/login`, loginData);
  return response.data;
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
  }

  return response?.data;
};

export const AuthService = { signup, login, saveUser, changePassword };
