import { createContext, useContext, useState } from "react";

const AdminSidebarContext = createContext<{ isSidebarOpen: boolean, setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>> }>({
    isSidebarOpen: false,
    setSidebarOpen: () => { },
});

// Using Context Provider to pass down global state
export function AdminSidebarContextProvider({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    return (
        <AdminSidebarContext.Provider value={{ isSidebarOpen, setSidebarOpen }}>
            {children}
        </AdminSidebarContext.Provider>
    );
};

export function AdminSidebarContextUse() {
    return useContext(AdminSidebarContext);
}