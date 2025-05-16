import "./Header.css";
import { Nav, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logoImage from "../../../assets/transparent-logo.png"; // you should add a logo image in assets folder
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Cookies } from "react-cookie";
import IUserToken from "../../../data/UserToken";
import { toastrSuccess } from "../../../utils/toastr";
import { logOut } from "../../../services/general/credential/login.service";

export default function Header() {
    const [credential, setCredential] = useState<IUserToken | null>(null);

    const navigate = useNavigate();

    const signOut = () => {
        logOut();
        navigate("/");
        toastrSuccess("Success", "Logged out successfully!");
    }

    useEffect(() => {
        const token = new Cookies().get("user-token") || "";
        if (token) {
            const decodedToken = jwtDecode(token) as IUserToken;
            setCredential(decodedToken);
        } else {
            setCredential(null);
        }

    }, []);

    return (
        <>
            <div className="p-3 header">
                <Nav variant="pills">
                    <li className="nav-item">
                        <NavLink to={"/"} className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/product"} className="nav-link">Products</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/gallery"} className="nav-link">Gallery</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/about-us"} className="nav-link">About Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/contact-us"} className="nav-link">Contact Us</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={"/sitemap"} className="nav-link">Sitemap</NavLink>
                    </li>
                </Nav>
                <div className="d-flex align-items-center justify-content-between">
                    {credential && credential.role === 1 ? (
                        <NavDropdown className="me-3" title={(<i className="fas fa-circle-user header__user-toggle"></i>)} align="end">
                            <NavDropdown.ItemText>Hello, {credential.name}</NavDropdown.ItemText>
                            <Link to={"/user/profile"} className="dropdown-item">
                                <i className="fas fa-user"></i> Profile
                            </Link>
                            {/* <NavDropdown.Item href="#">
                                <i className="fas fa-wrench"></i> Cài đặt
                            </NavDropdown.Item> */}
                            <NavDropdown.Divider />
                            <NavDropdown.Item onClick={signOut}>Đăng xuất</NavDropdown.Item>
                        </NavDropdown>
                    ) : (
                        <Nav variant="pills" className="header__credential me-3">
                            <li className="nav-item">
                                <NavLink to={"/login"} className="nav-link header__credential-link">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/register"} className="nav-link header__credential-link">Register</NavLink>
                            </li>
                        </Nav>
                    )}
                    <Link to={"/"} className="header__logo">
                        <img src={logoImage} alt="Clarin's Logo" width={80} />
                    </Link>
                </div>
            </div>
        </>
    );
};