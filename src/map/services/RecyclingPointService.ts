import { API_URL } from '../../common/constants';
import axios from 'axios';
import RecyclingPoint from '../models/RecyclingPoint';

export const getPoints = async () => {
  const response = await axios.get(`${API_URL}/points`);
  return response.data;
};

export const deletePoint = async (id: string) => {
  const response = await axios.delete(`${API_URL}/points/${id}`);
  return response.data;
};

export const savePoint = async (point: RecyclingPoint) => {
  let response = await axios.post(`${API_URL}/points/`, point);
  return response.data;
};

export default { getPoints, deletePoint, savePoint };
