import Mask from '../../masks/models/Mask';

export interface ICartItem {
  mask: Mask;
  amount: number;
  price: number;
}

export type CartContextType = {
  items: ICartItem[];
  addItem: (item: ICartItem) => void;
  removeItem: (index: number) => void;
  maskUpdated: (newMask: Mask) => void;
};
