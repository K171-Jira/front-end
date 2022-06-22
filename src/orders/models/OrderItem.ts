export default class OrderItem{
    maskId: string;
    amount: number;
    price: number;

    constructor(maskId: string, amount: number, price: number){
        this.maskId = maskId;
        this.amount = amount;
        this.price = price;
    }
}