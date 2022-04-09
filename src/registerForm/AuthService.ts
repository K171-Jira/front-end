import axios from 'axios';
import { useQuery } from 'react-query';
import { API_URL } from '../constants';
import SignupData from './SignupData';
import LoginData from './LoginData';

export const signup = async (signupData: SignupData) => {
  const response = await axios.post(`${API_URL}/users/register`, signupData);
  return response.data;
};

export const login = async (loginData: LoginData) => {
  const response = await axios.post(`${API_URL}/users/login`, loginData);
  return response.data;
};

export default { signup, login };
