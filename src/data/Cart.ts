export interface ICart {
    id: number;
    user_id: number;
    product_id: number;
    quantity: number;
    added_at: string;
}

export interface ICartItem {
    product_id: number;
    name: string;
    quantity: number;
    image_url: string;
    price: string;
}