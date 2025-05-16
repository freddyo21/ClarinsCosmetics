import axios from "axios";
import { API_URL } from "../../data/global-variables";
import { IBrand } from "../../data/Brand";

export function getAllBrands() {
    // const token = new Cookies().get("user-token");
    return axios.get<IBrand[]>(`${API_URL}/brands`);
}

export function getAllActiveBrands() {
    // const token = new Cookies().get("user-token");
    return axios.get<IBrand[]>(`${API_URL}/brands/active`);
}

export function getBrandById(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.get<IBrand>(`${API_URL}/brands/${id}`);
}

export function createBrand(brand: IBrand) {
    // const token = new Cookies().get("user-token");
    return axios.post<IBrand>(`${API_URL}/brands`, brand);
}

export function updateBrand(brand: IBrand, id: number) {
    // const token = new Cookies().get("user-token");
    return axios.patch<IBrand>(`${API_URL}/brands/${id}`, brand);
}

export function deleteBrand(id: number) {
    // const token = new Cookies().get("user-token");
    return axios.delete<IBrand>(`${API_URL}/brands/${id}`);
}