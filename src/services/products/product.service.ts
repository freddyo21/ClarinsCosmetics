import { Cookies } from "react-cookie";
import { IProduct, IProductModify } from "../../data/Product";
import axios from "axios";
import { API_URL } from "../../data/global-variables";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";

// axios.interceptors.request.use(config => {
//     const token = new Cookies().get("user-token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export function getAllProducts() {
    const token = new Cookies().get("user-token");
    return axios.get<IProduct[]>(`${API_URL}/products`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getAllActiveProducts() {
    const token = new Cookies().get("user-token");
    return axios.get<IProduct[]>(`${API_URL}/products/active`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getTopSelling() {
    const token = new Cookies().get("user-token");
    return axios.get<IProduct[]>(`${API_URL}/products/top-selling`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getProductById(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.get<IProduct>(`${API_URL}/products/${id}`);
}

export function getProductsByCategory(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.get<IProduct>(`${API_URL}/products/category/${id}`);
}

export function getProductsByBrand(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.get<IProduct>(`${API_URL}/products/brand/${id}`);
}

export function createProduct(product: IProductModify) {
    const token = new Cookies().get("user-token");
    return axios.post<IProductModify>(`${API_URL}/products`, product, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateProduct(product: IProductModify, id: number) {
    const token = new Cookies().get("user-token");
    return axios.patch<IProductModify>(`${API_URL}/products/${id}`, product, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteProduct(id: number) {
    const token = new Cookies().get("user-token");
    return axios.delete(`${API_URL}/products/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}