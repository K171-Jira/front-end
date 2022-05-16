import { API_URL } from '../../common/constants';
import axios from 'axios';
import Mask from '../models/Mask';

export const getMasks = async ({ queryKey }: any) => {
  const [, query] = queryKey;
  const response = await axios.get(`${API_URL}/masks?textQuery=${query}`);
  return response.data;
};

export const getMask = async ({ queryKey }: any) => {
  const [, id] = queryKey;
  const response = await axios.get(`${API_URL}/masks/${id}`);
  return response.data;
};

export const deleteMask = async (id: string) => {
  const response = await axios.delete(`${API_URL}/masks/${id}`);
  return response.data;
};

export const saveMask = async (mask: Mask) => {
  let response;
  if (mask.id) {
    response = await axios.put(`${API_URL}/masks/${mask.id}`, mask);
  } else {
    response = await axios.post(`${API_URL}/masks`, mask);
  }

  return response.data;
};

export default { getMasks, getMask, deleteMask, saveMask };
