import { Cookies } from "react-cookie";
import { API_URL } from "../../data/global-variables";
import axios from "axios";
import { IRating, IReview } from "../../data/Review";

export function getAllReviews() {
    const token = new Cookies().get("user-token");
    return axios.get<IReview[]>(`${API_URL}/reviews`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getRatingOfAllProducts() {
    const token = new Cookies().get("user-token");
    return axios.get<IRating[]>(`${API_URL}/reviews/rating`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

// export function getReviewById(id: number) {
//     const token = new Cookies().get("user-token");
//     return axios.get<IReview>(`${API_URL}/reviews/${id}`, {
//         headers: {
//             "Authorization": `Bearer ${token}`
//         }
//     });
// }