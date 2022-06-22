import { MaskType } from '../models/MaskType';

export default class Filters {
  brand: string;
  amount: number | null;
  priceFloor: number | null;
  priceCeiling: number | null;
  type: MaskType | null;

  constructor(dto: any = null) {
    this.brand = dto?.brand??"";
    this.amount = dto?.amount??null;
    this.priceFloor = dto?.priceFloor??null;
    this.priceCeiling = dto?.priceCeiling??null;
    this.type = dto?.type??null;
  }
}
