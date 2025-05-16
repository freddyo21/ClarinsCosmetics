import { Collapse, Nav } from "react-bootstrap";
import { AdminSidebarContextUse } from "../../../context/AdminSidebarContext";
import "./AdminSidebar.css";
import { Link, NavLink, useLocation } from "react-router-dom";

export default function AdminSidebar() {
    const path = useLocation().pathname.split("/")[2];
    const { isSidebarOpen, setSidebarOpen } = AdminSidebarContextUse();

    return (
        <>
            <Collapse in={isSidebarOpen} dimension="width" className="admin-sidebar">
                <div className="admin-sidebar__container">
                    <div className="admin-sidebar__header">
                        {/* <div className="d-flex justify-content-between align-items-center gap-2 py-2"> */}
                        <Link to="/admin/dashboard" className="text-xl font-bold text-white">
                            <h4 className="font-bold">Admin Panel</h4>
                        </Link>

                        <div className="admin-sidebar__header-icon">
                            <i className="fas fa-chevron-left" onClick={() => setSidebarOpen(false)}></i>
                        </div>
                        {/* </div> */}
                    </div>

                    <div className="admin-sidebar__body">
                        <div className="admin-sidebar__section-container">
                            {Object.entries(sidebarData).map(([key, value]) => (
                                <div key={key} className="admin-sidebar__section">
                                    <div className="text-lg font-bold text-white admin-sidebar__section-header">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                                    <div className="admin-sidebar__list-container text-sm">
                                        {/* <ul className="admin-sidebar__list">
                                            {value.map((item, index) => (
                                                <li key={index} className="admin-sidebar__item">
                                                    <Link role="button" to={`/admin/${item.path}`}
                                                        className={`btn d-flex align-items-center gap-3 
                                                        ${path === item.path
                                                                ? "btn-sidebar-selected"
                                                                : ""}`}>
                                                        <span style={{ width: "15px" }}><i className={`fas ${item.icon}`}></i></span>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul> */}
                                        <Nav variant="pills" className="flex-column admin-sidebar__list">
                                            {value.map((item, index) => (
                                                <li key={index} className="admin-sidebar__item">
                                                    <NavLink role="button" to={`/admin/${item.path}`}
                                                        className={`d-flex nav-link gap-3 text-md`}>
                                                        <span style={{ width: "16px" }}
                                                            className="d-flex align-items-center justify-content-center">
                                                            <i className={`fas ${item.icon}`}></i>
                                                        </span>
                                                        {item.name}
                                                    </NavLink>
                                                </li>
                                            ))}
                                        </Nav>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Collapse>
        </>
    )
}

const sidebarData = {
    dashboard: [
        {
            path: "dashboard",
            name: "Dashboard",
            icon: "fa-sliders"
        }
    ],
    management: [
        {
            path: "user-management",
            name: "User Management",
            icon: "fa-users"
        },
        {
            path: "product-management",
            name: "Product Management",
            icon: "fa-bag-shopping"
        },
        {
            path: "categories",
            name: "Categories & Brands",
            icon: "fa-layer-group"
        },
        {
            path: "orders",
            name: "Order Management",
            icon: "fa-file-lines"
        },
    ],
    analytics: [
        {
            path: "revenue",
            name: "Revenue",
            icon: "fa-chart-line"
        },
    ],
    system: [
        {
            path: "settings",
            name: "Settings",
            icon: "fa-gears"
        },
    ]
}