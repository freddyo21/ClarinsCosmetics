import axios from "axios";
import { API_URL } from "../../../data/global-variables";

interface LoginData {
    email: string;
    password: string;
    remember_me: boolean;
}

export async function login(data: LoginData) {
    // Function to handle form submission
    // Example: Send data to an API or handle it as needed
    return axios.post(`${API_URL}/users/login`, data);
}

export function logOut() {
    window.cookieStore.getAll("user-token").then((cookies) => {
        cookies.forEach(cookie => {
            if (cookie.name === "user-token") {
                window.cookieStore.delete(cookie.name);
            }
        });
    });
    window.location.reload;
}