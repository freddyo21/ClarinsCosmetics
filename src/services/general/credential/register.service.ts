import axios from "axios";
import { API_URL } from "../../../data/global-variables";

interface RegisterData {
    dob: Date
    email: string
    gender: boolean
    name: string
    password: string
    password_confirm: string
    phone: string
}

export async function register(data: RegisterData) {
    // Function to handle form submission
    // Example: Send data to an API or handle it as needed
    return axios.post(`${API_URL}/users`, data);
}