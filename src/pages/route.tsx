import NotFound from "./NotFound";
import HomeLayout from "../layout/home/home-layout";
import Home from "../features/home/home";
import Sitemap from "../features/sitemap/sitemap";
import { RouteObject } from "react-router-dom";
import AboutUs from "../features/about-us/about-us";
import ContactUs from "../features/contact-us/contact-us";
import Products from "../features/product/product";
import Login from "../features/login/login";
import Register from "../features/register/register";
import AdminDashboard from "../features/admin/dashboard/dashboard";
import AdminLayout from "../layout/admin/admin-layout";
import UserManagement from "../features/admin/user-management/user-management";
import { AdminSidebarContextProvider } from "../context/AdminSidebarContext";
import LoginForm from "../features/login/login-form/login-form";
import ProductManagement from "../features/admin/products-management/product-management";
import CategoriesAndBrands from "../features/admin/categories-n-brands/categories-n-brands";
import UserLayout from "../layout/user/user-layout";
import UserProfile from "../features/users/user-profile/user-profile";
import ChangePassword from "../features/users/change-password/change-password";
import Checkout from "../features/checkout/checkout";

export const routes: RouteObject[] = [
    {
        path: "/",
        id: "Main Pages",
        element: <HomeLayout />,
        children: [
            {
                index: true,
                id: "Home",
                element: <Home />,
            },
            {
                path: "product",
                id: "Products & Categories",
                element: <Products />
            },
            {
                path: "about-us",
                id: "About Us",
                element: <AboutUs />
            },
            {
                path: "contact-us",
                id: "Contact Us",
                element: <ContactUs />
            },
            {
                path: "gallery",
                id: "Gallery",
                element: <div>Gallery Page</div>
            },
            {
                path: "sitemap",
                id: "Sitemap",
                element: <Sitemap />
            },
            {
                path: "login",
                id: "Login",
                element: <Login />,
                children: [
                    {
                        index: true,
                        id: "Login Form",
                        element: <LoginForm />
                    },
                    {
                        path: "forgot-password",
                        id: "Forgot Password",
                        element: <div>Forgot Password Page</div>
                    }
                ]
            },
            {
                path: "register",
                id: "Register",
                element: <Register />
            },
            {
                path: "checkout",
                id: "Checkout",
                element: <Checkout />
            }
        ],
    },
    {
        path: "admin",
        id: "Admin",
        element: <AdminSidebarContextProvider><AdminLayout /></AdminSidebarContextProvider>,
        children: [
            {
                path: "dashboard",
                id: "Admin Dashboard",
                element: <AdminDashboard />
            },
            {
                path: "user-management",
                id: "User Management",
                element: <UserManagement />
            },
            {
                path: "product-management",
                id: "Product Management",
                element: <ProductManagement />
            },
            {
                path: "categories",
                id: "Brands & Categories",
                element: <CategoriesAndBrands />
            },
            {
                path: "orders",
                id: "Order Management", element: <div>Order Management</div>
            },
            {
                path: "revenue",
                id: "Revenue", element: <div>Revenue Page</div>
            },
            {
                path: "profile",
                id: "Admin Profile", element: <div>Admin Profile</div>
            },
            {
                path: "settings",
                id: "Settings", element: <div>Settings</div>
            }
        ],
    },
    {
        path: "user",
        id: "User",
        element: <UserLayout />,
        children: [
            {
                path: "profile",
                id: "Profile",
                element: <UserProfile />
            },
            {
                path: "orders",
                id: "Order History",
                element: <div>Order History Page</div>
            },
            {
                path: "cart",
                id: "Cart",
                element: <div>Cart Page</div>
            },
            {
                path: "change-password",
                id: "Change Password",
                element: <ChangePassword />
            },
        ]
    },
    {
        path: "order",
        id: "Order",
        element: <div>Order Page</div>
    },
    { path: "*", element: <NotFound /> },
];