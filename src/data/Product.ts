export interface IProduct {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    stock_quantity: number;
    rating: number;
    description: string;
    image_url: string;
    sold: number;
    status: number;
    create_at: string;
    update_at: string;
};

export interface IProductModify {
    name: string;
    price: number;
    stock_quantity: number;
    description: string;
    brand_id: number;
    category_id: number;
    status: number;
    image_url: string;
}