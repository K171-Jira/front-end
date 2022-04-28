import { MaskType } from './MaskType';

export default class Mask {
  id: string;
  name: string;
  brand: string;
  imageUrl: string;
  amount: number;
  price: number;
  type: MaskType;

  constructor(dto: any) {
    this.id = dto._id;
    this.name = dto.name;
    this.brand = dto.brand;
    this.imageUrl = dto.imageUrl ?? '';
    this.amount = dto.amount;
    this.price = dto.price;
    this.type = dto.type;
  }
}
