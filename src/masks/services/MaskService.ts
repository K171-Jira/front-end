import { API_URL } from '../../common/constants';
import axios from 'axios';
import Mask from '../models/Mask';
import SearchOptions from '../components/SearchOptions';

export const getMasks = async ({ queryKey }: any) => {
  const [, searchOptions] = queryKey
  const response = await axios.get(`${API_URL}/masks?textQuery=${searchOptions.textQuery}&brand=${searchOptions.filters.brand}&amount=${searchOptions.filters.amount ?? ""}&priceFloor=${searchOptions.filters.priceFloor ?? ""}&priceCeiling=${searchOptions.filters.priceCeiling ?? ""}&type=${searchOptions.filters.type}`);
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
