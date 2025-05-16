import "./admin-layout.css";
import { Outlet, useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/use-title";
import { routes } from "../../pages/route";
import AdminNavigation from "../../components/admin/navigation/AdminNavigation";
import AdminSidebar from "../../components/admin/side-bar/AdminSidebar";
import { AdminSidebarContextUse } from "../../context/AdminSidebarContext";
import { useWindowWidth } from "../../hooks/use-window-width";


export default function AdminLayout() {
    const location = useLocation();
    useTitle(`Clarin's Cosmetics - ${routes[1].children?.find((e) => e.path === location.pathname.split("/")[1])?.id || "Admin Dashboard"}`);

    const { isSidebarOpen } = AdminSidebarContextUse();
    const windowWidth = useWindowWidth();

    return (
        <>
            <div className="admin__layout">
                <div className="admin__sidebar" style={{ width: isSidebarOpen ? "16rem" : "0px", transition: "width 0.3s ease-in-out" }}>
                    <AdminSidebar />
                </div>

                <div className="admin__content-container"
                    style={{
                        width: isSidebarOpen && windowWidth > 1200 ? "calc(100% - 16rem)" : windowWidth,
                        transition: "width 0.3s ease-in-out"
                    }}>
                    <AdminNavigation />
                    <main className="admin__content">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}