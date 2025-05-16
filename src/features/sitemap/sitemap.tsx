import "./sitemap.css"; // Import the CSS file for the sitemap styles
import { Card } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { routes } from "../../pages/route";


export default function Sitemap() {
    const location = useLocation();

    return (
        <>
            <Card className="sitemap__card">
                <Card.Body>
                    <section className="sitemap p-4">
                        <h2>
                            <i className="fas fa-list"></i> Sitemap
                        </h2>
                        <p className="mb-3">
                            Welcome to the Clarins website sitemap. Use this page to navigate through all the sections and pages of our website.
                        </p>
                        <div className="sitemap__pages-container">
                            {routes.filter((e) => e.path !== "admin" && e.path !== "*").map((route, index) => (
                                <div key={index} className="sitemap__item">
                                    <Card className="sitemap__pages">
                                        <Card.Header>
                                            <b>{route.id}</b>
                                        </Card.Header>
                                        <Card.Body>
                                            <ul className="sitemap__child">
                                                {route.children?.map((child, index) => (
                                                    <li key={index}>
                                                        <Link className="sitemap__link" to={route.path === "/"
                                                            ? (child.index ? "/" : `/${child.path}`)
                                                            : `/${route.path}/${child.path}`} state={{ from: location }}
                                                            style={location.pathname === `/${child.path}` ? { color: "#f00", fontWeight: "600" } : {}}>
                                                            {child.id}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </div>
                            ))}
                        </div>
                        <Card>
                            <Card.Body>
                                <h3 className="mb-4">Can't find what you're looking for?</h3>
                                <div>
                                    If you can't find the page you're looking for, please visit our <Link to="/contact-us">Contact Us</Link> or use the navigation menu at the top of the website.
                                </div>
                            </Card.Body>
                        </Card>
                    </section>
                </Card.Body>
            </Card>
        </>
    );
}