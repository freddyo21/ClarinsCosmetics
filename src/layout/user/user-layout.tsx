import { Outlet, useLocation } from "react-router-dom";
import "./user-layout.css";
import { useTitle } from "../../hooks/use-title";
import { routes } from "../../pages/route";
import ScrollingTicker from "../../components/general/scrolling-ticker/ScrollingTicker";
import { Col, Container, Row } from "react-bootstrap";
import Header from "../../components/user/header/Header";
import UserSidebar from "../../components/user/sidebar/Sidebar";

export default function UserLayout() {
    const location = useLocation();
    useTitle(`Clarin's Cosmetics - ${routes[2].children?.find((e) => e.path === location.pathname.split("/")[1])?.id || "Home"}`);

    return (
        <>
            <Header />
            <div className="user-layout">
                <Container fluid="md">
                    <Row>
                        <Col md={3} className="user-layout__sidebar">
                            <UserSidebar />
                        </Col>
                        <Col md={9}>
                            <Outlet />
                        </Col>
                    </Row>
                </Container>
            </div>
            <ScrollingTicker />
        </>
    )
}