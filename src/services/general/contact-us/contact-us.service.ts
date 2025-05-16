import axios from "axios";


export default function createMessage(formData: FormData) {
    // Function to handle form submission
    const data = Object.fromEntries(
        Array.from(formData.entries()).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]) // Trim string values
    );
    console.log(data);

    // Example: Send data to an API or handle it as needed
    return axios.post('http://localhost:8986/api/contact-us', data);        
}