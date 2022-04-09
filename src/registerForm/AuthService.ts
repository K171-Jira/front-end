import axios from 'axios';
import { useQuery } from 'react-query';
import { API_URL } from '../constants';
import SignupData from './SignupData';

export const signup = async (signupData: SignupData) => {
  const response = await axios.post(`${API_URL}/users/register`, signupData);
  return response.data;
};

export const Login = (loginData: SignupData) => {
  const { data, error, isLoading } = useQuery('login', async () => {
    const response = await axios.post('/users/login', loginData);
    return response.data;
  });
  return {
    data,
    error,
    isLoading,
  };
};

export default { signup };
