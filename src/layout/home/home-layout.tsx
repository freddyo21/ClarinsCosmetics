import "./home-layout.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../../components/general/header/Header";
import ScrollingTicker from "../../components/general/scrolling-ticker/ScrollingTicker";
import { Container } from "react-bootstrap";
import { routes } from "../../pages/route";
import { useTitle } from "../../hooks/use-title";


export default function HomeLayout() {
    const location = useLocation();
    useTitle(`Clarin's Cosmetics - ${routes[0].children?.find((e) => e.path === location.pathname.split("/")[1])?.id || "Home"}`);

    return (
        <>
            <Header />
            <div className="home-content">
                <Container fluid="md">
                    <Outlet />
                </Container>
            </div>
            <ScrollingTicker />
        </>
    );
}