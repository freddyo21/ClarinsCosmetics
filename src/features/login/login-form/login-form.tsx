import { Button, FloatingLabel, FormCheck, FormControl } from "react-bootstrap";
import "./login-form.css";
import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { toastrError, toastrInfo, toastrSuccess } from "../../../utils/toastr";
import { login } from "../../../services/general/credential/login.service";
import IUserToken from "../../../data/UserToken";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login logic here
        toastrInfo("Please wait", "Logging in...");

        // For example, you can send a request to your backend API
        // to authenticate the user with the provided email and password
        const data = {
            email,
            password,
            remember_me: rememberMe
        };

        console.log("Remember Me: ", rememberMe);

        // Call your login service or API here
        login(data).then(response => {
            if (response.status === 200) {
                toastrSuccess("Success", "Logged in successfully!");

                // Remove the token from cookies if it exists
                const cookies = new Cookies();
                if (cookies.get("user-token")) {
                    cookies.remove("user-token");
                }

                // Set the token in cookies with a max age of 30 days if remember me is checked
                const token = response.data.token;

                if (rememberMe) {
                    new Cookies().set("user-token", token, {
                        maxAge: 3600 * 24 * 30 // 30 days
                    });
                } else {
                    new Cookies().set("user-token", token, {
                        maxAge: 3600
                    });
                }

                // If role is 0, redirect to admin dashboard
                // Else, redirect to the home page
                if (response.data.role === 0) {
                    navigate("/admin/dashboard");
                } else {
                    navigate("/");
                }
            }
        }).catch(error => {
            if (error.response.status === 403) {
                toastrError("Error", error.response.data.message);
                return;
            }

            if (error.response.status === 422) {
                toastrError("Error", error.response.data.errors.join(" ").toString());
                return;
            }
            toastrError("Error", error.response.data.message || "An error occurred while sending your message.");
        });
    }

    useEffect(() => {
        const cookies = new Cookies().get("user-token");

        // Check if the token is valid and not expired
        if (cookies) {
            // Decode the JWT token to get the payload
            const payload = jwtDecode(cookies) as IUserToken;

            // If the token is valid, redirect to the appropriate page
            // and show a success message
            if (payload.role === 0) {
                navigate("/admin/dashboard");
                toastrSuccess("Success", `Welcome back, ${payload.name}!`);
            } else {
                navigate("/");
                toastrSuccess("Success", "You are already logged in!");
            }
        }
    }, [navigate]);

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h2 className="text-center">Login</h2>
                <div className="mb-2">
                    <FloatingLabel label="Email address" className="mb-3">
                        <FormControl type="email" placeholder="name@example.com" name="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel label="Password">
                        <FormControl type="password" placeholder="Password" name="password" value={password}
                            onChange={(e) => setPassword(e.target.value)} autoComplete="" />
                    </FloatingLabel>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <FormCheck>
                            <FormCheck.Input type="checkbox" id="remember-me" name="rememberMe" defaultChecked={rememberMe}
                                onChange={() => setRememberMe((prev) => !prev)} />
                            <FormCheck.Label htmlFor="remember-me">Remember me for 30 days</FormCheck.Label>
                        </FormCheck>

                        <Link to={"./forgot-password"} role="button" className="mb-2">Forgot password?</Link>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <Button type="submit" variant="gradient-primary" className="w-100">Login</Button>
                </div>
            </form>

            <div>
                <p className="text-center mt-3">
                    Don't have an account? <Link to={"/register"} role="button">
                        <Button variant="gradient-primary">Create account</Button>
                    </Link>
                </p>
            </div>
        </>
    )
}