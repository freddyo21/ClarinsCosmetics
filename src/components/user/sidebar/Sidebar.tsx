import "./Sidebar.css";
import { useEffect, useState } from "react";
import IUserToken from "../../../data/UserToken";
import { Cookies } from "react-cookie";
import { jwtDecode } from "jwt-decode";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";


export default function UserSidebar() {
    const [credential, setCredential] = useState<IUserToken | null>(null);
    const token = new Cookies().get("user-token") || "";

    const path = useLocation().pathname.split("/")[2];

    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token) as IUserToken;
            setCredential(decodedToken);
        } else {
            setCredential(null);
        }

    }, [token]);

    return (
        <>
            <div className="user-sidebar">
                <div className="user-sidebar__container">
                    <div className="user-sidebar__header">
                        <div className="d-flex align-items-center justify-content-center">
                            <h1 className="text-lg">Hello, {credential?.name}</h1>
                        </div>
                    </div>
                    <div className="user-sidebar__body">
                        <Nav variant="pills" className="flex-column user-sidebar__list">
                            <li>
                                <NavLink role="button" to={`/user/profile`}
                                    className={`d-flex nav-link gap-3`}>
                                    <span style={{ width: "16px" }} className="d-flex align-items-center justify-content-center">
                                        <i className="fas fa-user"></i>
                                    </span> Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink role="button" to={`/user/orders`}
                                    className={`d-flex nav-link gap-3`}>
                                    <span style={{ width: "16px" }} className="d-flex align-items-center justify-content-center">
                                        <i className="fas fa-bag-shopping"></i>
                                    </span> Orders
                                </NavLink>
                            </li>
                            <li>
                                <NavLink role="button" to={`/user/cart`}
                                    className={`d-flex nav-link gap-3`}>
                                    <span style={{ width: "16px" }} className="d-flex align-items-center justify-content-center">
                                        <i className="fas fa-cart-shopping"></i>
                                    </span> Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink role="button" to={`/user/change-password`}
                                    className={`d-flex nav-link gap-3`}>
                                    <span style={{ width: "16px" }} className="d-flex align-items-center justify-content-center">
                                        <i className="fas fa-key"></i>
                                    </span> Change Password
                                </NavLink>
                            </li>
                        </Nav>
                    </div>
                </div>
            </div>
        </>
    )
}