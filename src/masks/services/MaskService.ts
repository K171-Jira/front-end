import { API_URL } from '../../common/constants';
import axios from 'axios';
import Mask from '../models/Mask';
import SearchOptions from '../components/SearchOptions';

export const getMasks = async ({ queryKey }: any) => {
  const [, searchOptions] = queryKey;
  const response = await axios.get(
    `${API_URL}/masks?textQuery=${searchOptions.textQuery}&brand=${searchOptions.filters.brand}&amount=${
      searchOptions.filters.amount ?? ''
    }&priceFloor=${searchOptions.filters.priceFloor ?? ''}&priceCeiling=${
      searchOptions.filters.priceCeiling ?? ''
    }&type=${searchOptions.filters.type ?? ''}`
  );
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

export const saveMask = async ({ mask, imageFile }: { mask: Mask; imageFile: File | null }) => {
  const bodyFormData = new FormData();
  bodyFormData.append('name', mask.name);
  bodyFormData.append('brand', mask.brand);
  console.log(imageFile);
  console.log(mask.imageUrl);
  if (imageFile) {
    bodyFormData.append('maskImage', imageFile);
  }
  if (!imageFile && mask.imageUrl.length === 0) {
    bodyFormData.append('maskImage', '');
  }
  bodyFormData.append('amount', mask.amount.toString());
  bodyFormData.append('price', mask.price.toString());
  bodyFormData.append('type', mask.type);
  let response;
  if (mask.id) {
    response = await axios.put(`${API_URL}/masks/${mask.id}`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } else {
    response = await axios.post(`${API_URL}/masks`, bodyFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  return response.data;
};

// export const saveProduct = async (product: ProductSaveRequest) => {
//   const bodyFormData = new FormData();
//   bodyFormData.append('name', product.name);
//   bodyFormData.append('subtitle', product.subtitle);
//   bodyFormData.append('description', product.description);
//   for (const image of product.productImages) {
//     bodyFormData.append('productImages', image);
//   }
//   for (const image of product.images) {
//     bodyFormData.append('images', image);
//   }
//   bodyFormData.append('pricePerDay', product.pricePerDay.toString());
//   bodyFormData.append('amount', product.amount.toString());
//   bodyFormData.append('status', ProductStatus.unapproved);
//   let response;
//   if (product._id) {
//     response = await axios.put(`${API_URL}/products/${product._id}`, bodyFormData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   } else {
//     response = await axios.post(`${API_URL}/products`, bodyFormData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
//   }
//
//   return response.data;
// };

export default { getMasks, getMask, deleteMask, saveMask };
