export interface IReview {
    id: number;
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
    created_at: string;
}

export interface IRating {
    product_id: number;
    average_rating: number;
    total_reviews: number;
}