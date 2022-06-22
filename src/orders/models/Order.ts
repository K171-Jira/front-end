import OrderItem from "./OrderItem";

export default class Order{
    userId: string;

    items: OrderItem[];

    constructor(dto: any){
        this.userId = dto.userId;
        this.items = dto.items.map((item: { maskId: string; amount: number; price: number;  }) => new OrderItem(item.maskId, item.amount, item.price))
    }
}