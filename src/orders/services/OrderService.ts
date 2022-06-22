import { API_URL } from '../../common/constants';
import axios from 'axios';
import Order from '../models/Order';

export const addOrder = async (order: Order) => {
    const response = await axios.post(`${API_URL}/orders/placeOrder`, order);
  return response.data;
};

export const getOrders = async ({ queryKey }: any) => {
  console.log("getOrders KVIEČIA");
  const [, id] = queryKey;
  const response = await axios.get(`${API_URL}/orders/getOrder/${id}`);
  return response.data;
};


export const OrderService = { addOrder, getOrders };