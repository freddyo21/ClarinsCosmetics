import { Link, useNavigate } from "react-router-dom";
import "./AdminNavigation.css";
import { Button, Dropdown, DropdownDivider, DropdownItemText } from "react-bootstrap";
import { toastrError, toastrSuccess } from "../../../utils/toastr";
import { Cookies } from "react-cookie";
import { useEffect, useState } from "react";
import IUserToken from "../../../data/UserToken";
import { logOut } from "../../../services/general/credential/login.service";
import { AdminSidebarContextUse } from "../../../context/AdminSidebarContext";
// import AdminSidebar from "../side-bar/AdminSidebar";

export default function AdminNavigation() {
    const [payloadData, setPayloadData] = useState<IUserToken>();
    const { setSidebarOpen } = AdminSidebarContextUse();

    const navigate = useNavigate();

    const signOut = () => {
        logOut();
        navigate("/");
        toastrSuccess("Success", "Logged out successfully!");
    }

    useEffect(() => {
        const token = new Cookies().get("user-token");
        const payload = token ? JSON.parse(atob(token.split('.')[1])) as IUserToken : null;

        if (!payload) {
            navigate("/");
            toastrError("Error", "Please login before using this page!");
            return;
        }

        if (payload.role !== 0) {
            navigate("/");
            toastrError("Error", "You are not authorized to access this page.");
            return;
        }

        setPayloadData(payload);
    }, [navigate]);

    return (
        <header className="border-b bg-white admin__navigation-container">
            <div className="admin__navigation-content">
                <div className="d-flex align-items-center gap-3">
                    {/* <SidebarTrigger /> */}
                    {/* <AdminSidebar /> */}
                    <i className="fas fa-bars" onClick={() => setSidebarOpen(prev => !prev)}></i>
                    <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <button className="rounded-full p-2 admin__notifications">
                        <i className="fas fa-bell"></i>
                    </button>

                    <Dropdown>
                        <Dropdown.Toggle as={Button} variant="danger" className="d-flex align-items-center gap-2 admin__user-toggle">
                            <i className="fas fa-circle-user"></i>
                            <span>{payloadData?.name || "Admin"}</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu align="end">
                            <DropdownItemText>Hello, {payloadData?.name || "Admin"}</DropdownItemText>
                            <Link to="/admin/profile" className="d-flex align-items-center gap-2 dropdown-item">
                                <i className="fas fa-user"></i> Profile
                            </Link>
                            <DropdownDivider />
                            <Link to="/" className="d-flex align-items-center gap-2 dropdown-item" onClick={signOut}>
                                <i className="fas fa-right-from-bracket"></i> Log Out
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </header >
    );
}