import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import IUserToken from "../data/UserToken";
import { toastrSuccess } from "../utils/toastr";


export function useLoginCheck() {
    const navigate = useNavigate();

    const cookies = new Cookies().get("user-token");
    if (cookies) {
        const payload = jwtDecode(cookies) as IUserToken;
        console.log(payload);
        if (payload && payload.role) {
            if (payload.role === 0) {
                navigate("/admin/dashboard");
                toastrSuccess("Success", `Welcome back ${payload.name}!`);
            } else {
                navigate("/");
                toastrSuccess("Success", "You are already logged in!");
            }
        }
    }
}