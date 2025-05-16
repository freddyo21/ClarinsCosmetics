import axios from "axios";
import { API_URL } from "../../data/global-variables";
import { ICategory } from "../../data/Category";

export function getAllCategories() {
    // const token = new Cookies().get("user-token");
    return axios.get<ICategory[]>(`${API_URL}/categories`);
}

export function getAllActiveCategories() {
    // const token = new Cookies().get("user-token");
    return axios.get<ICategory[]>(`${API_URL}/categories/active`);
}

export function getCategoryById(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.get<ICategory>(`${API_URL}/categories/${id}`);
}

export function createCategory(category: ICategory) {
    // const token = new Cookies().get("user-token");
    return axios.post<ICategory>(`${API_URL}/categories`, category);
}

export function updateCategory(category: ICategory, id: number) {
    // const token = new Cookies().get("user-token");
    return axios.patch<ICategory>(`${API_URL}/categories/${id}`, category);
}

export function deleteCategory(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.delete<ICategory>(`${API_URL}/categories/${id}`);
}