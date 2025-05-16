import axios from "axios";
import { API_URL } from "../../data/global-variables";
import { IUserFull } from "../../data/User";
import { Cookies } from "react-cookie";
import IUserToken from "../../data/UserToken";
import { jwtDecode } from "jwt-decode";


export function getAllUsers() {
    const token = new Cookies().get("user-token");
    return axios.get<IUserFull[]>(`${API_URL}/users`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getUserById(id: number) {
    const token = new Cookies().get("user-token");
    return axios.get(`${API_URL}/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function createUser(user: IUserFull) {
    const token = new Cookies().get("user-token");
    return axios.post<IUserFull>(`${API_URL}/users`, user, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function updateUser(user: IUserFull, id: number) {
    const token = new Cookies().get("user-token");
    return axios.patch<IUserFull>(`${API_URL}/users/${id}`, user, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function deleteUser(id: number) {
    const token = new Cookies().get("user-token");
    return axios.delete<IUserFull>(`${API_URL}/users/${id}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function getUserToken() {
    const cookies = new Cookies();
    const token = cookies.get("user-token");
    if (token) {
        return jwtDecode<IUserToken>(token);
    }
    return null;
}

export function oldPasswordConfirmation(data: { id: number, password: string }) {
    const token = new Cookies().get("user-token");

    return axios.post(`${API_URL}/users/password-confirmation`, data, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function changePassword(userId: number, password: string) {
    const token = new Cookies().get("user-token");
    return axios.patch(`${API_URL}/users/${userId}`, { password }, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });
}

export function forgotPassword(email: string) {
    return axios.post(`${API_URL}/users/forgot-password`, { email });
}