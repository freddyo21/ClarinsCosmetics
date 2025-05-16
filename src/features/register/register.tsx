import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import "./register.css";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import IUserToken from "../../data/UserToken";
import { toastrError, toastrSuccess } from "../../utils/toastr";

export default function Register() {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        gender: false,
        email: "",
        phone: "",
        password: "",
        password_confirm: "",
    });

    const navigate = useNavigate();

    const handleChangeRegister = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    // const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedData = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [key, typeof value == "string" ? value.trim() : value])
        ) as typeof formData;
        setFormData(trimmedData);


        // Handle login logic here
        if (formData.password !== formData.password_confirm) {
            toastrError("Error", "Password and Confirm Password do not match!");
            return;
        }

        // For example, you can send a request to your backend API
        // to authenticate the user with the provided email and password
        console.log(trimmedData);

        // Call your login service or API here
    }

    useEffect(() => {
        const cookies = new Cookies().get("user-token");
        if (cookies) {
            const payload = jwtDecode(cookies) as IUserToken;
            console.log(payload);
            if (payload.role === 0) {
                navigate("/admin/dashboard");
                toastrSuccess("Success", `Welcome back ${payload.name}!`);
            } else {
                navigate("/");
                toastrSuccess("Success", "You are already logged in!");
            }
        }
    }, [navigate]);

    return (
        <>
            <div className="register__container">
                <div className="register__container--background">
                    <div>
                        <h3 className="mb-3">Hello!</h3>
                        <p className="text-md mb-5">Enter your personal details and start journey with us</p>
                    </div>
                </div>

                <div className="register__container--form">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-center">Register</h2>
                        <div className="mb-3">
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control placeholder="Fullname" name="name" value={formData.name}
                                    onChange={handleChangeRegister} />
                            </FloatingLabel>
                            <FloatingLabel label="Date of Birth" className="mb-3">
                                <Form.Control type="date" placeholder="Date of Birth" name="dob" value={formData.dob}
                                    onChange={handleChangeRegister} />
                            </FloatingLabel>

                            <Form.Group>
                                <div className="d-flex align-items-center mb-3">
                                    <Form.Label className="me-2">Gender</Form.Label>
                                    <Form.Check className="me-2">
                                        <Form.Check.Label>Male</Form.Check.Label>
                                        <Form.Check.Input type="radio" name="gender" value={0} onChange={handleChangeRegister} defaultChecked />
                                    </Form.Check>
                                    <Form.Check>
                                        <Form.Check.Label >Female</Form.Check.Label>
                                        <Form.Check.Input type="radio" name="gender" value={1} onChange={handleChangeRegister} />
                                    </Form.Check>
                                </div>
                            </Form.Group>

                            <InputGroup>
                                <FloatingLabel label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" name="email" value={formData.email}
                                        onChange={handleChangeRegister} />
                                </FloatingLabel>
                                <FloatingLabel label="Phone Number" className="mb-3">
                                    <Form.Control placeholder="0912345678" name="phone" value={formData.phone}
                                        onChange={handleChangeRegister} />
                                </FloatingLabel>
                            </InputGroup>

                            <InputGroup>
                                <FloatingLabel label="Password">
                                    <Form.Control type="password" placeholder="Password" name="password" value={formData.password}
                                        onChange={handleChangeRegister} autoComplete="" />
                                </FloatingLabel>
                                <FloatingLabel label="Confirm Password">
                                    <Form.Control type="password" placeholder="Confirm password" name="password_confirm" value={formData.password_confirm}
                                        onChange={handleChangeRegister} autoComplete="" />
                                </FloatingLabel>
                            </InputGroup>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Button type="submit" variant="gradient-primary" className="w-100">Sign Up</Button>
                        </div>
                    </form>

                    <div>
                        <p className="text-center mt-3">
                            Already have an account? <Link to={"/login"} role="button">
                                <Button variant="gradient-primary">Login</Button>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}