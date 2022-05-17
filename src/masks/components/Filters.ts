import { MaskType } from "../models/MaskType";

export default class Filters {
    brand: string;
    amount: number | null;
    priceFloor: number | null;
    priceCeiling : number | null;
    type: MaskType;

    constructor(brand: string, amount: number, priceFloor: number, priceCeiling: number, type: MaskType) {
        this.brand = brand;
        this.amount = amount;
        this.priceFloor = priceFloor;
        this.priceCeiling = priceCeiling;
        this.type = type;
    }
}
