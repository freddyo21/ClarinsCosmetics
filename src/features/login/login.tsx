import "./login.css";
import { Outlet } from "react-router-dom";

export default function Login() {

    return (
        <>
            <div className="login__container">
                <div className="login__container--form">
                    <Outlet />
                </div>

                <div className="login__container--background">
                    <div>
                        <h3 className="mb-3">Welcome Back!</h3>
                        <p className="text-md mb-5">To keep connected with us please login with your personal info</p>
                    </div>
                </div>
            </div>
        </>
    )
}