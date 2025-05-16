import "./about-us.css"; // Import the CSS file for the about us styles
import { Card } from "react-bootstrap";


export default function AboutUs() {
    return (
        <>
            <Card className="about-us__card">
                <Card.Body>
                    <h2>
                        <i className="fas fa-circle-info"></i> About Us
                    </h2>
                    <ul>
                        <li>Welcome to Clarins, where beauty meets nature. We are committed to providing high-quality skincare and makeup products that enhance your natural beauty. Our products are formulated with the finest ingredients, sourced from around the world, to ensure that you receive the best care for your skin.</li>
                        <li>At Clarins, we believe in the power of nature and science working together. Our team of experts is dedicated to creating innovative products that deliver visible results while being gentle on your skin.</li>
                        <li>Join us on our journey to discover the beauty of nature and the art of skincare.</li>
                    </ul>

                    <h3>Our Story</h3>
                    <ul className="mb-4">
                        <li>Founded in 1954, Clarins has been at the forefront of skincare innovation for over 60 years. Our founder, Jacques Courtin-Clarins, believed that beauty should be accessible to everyone. Today, we continue to uphold this philosophy by creating products that cater to all skin types and concerns.</li>
                    </ul>

                    <h3>Our Philosophy</h3>
                    <ul className="mb-4">
                        <li>Clarins has been providing botanical-based and innovative solutions. The aim remains the same: to search for one of a kind solutions for unique clients. Clarins is a way to simultaneously achieve great results and a sensorial experience in itself.</li>
                        <li>To that end, the formulas embody the best of what the botanical world has to offer. Apart from providing their own range of products, they also offer products from various other brands on their website. This helps their customer to find one place solution for all SkinCare and Beauty products available in the market.</li>
                        <li>We believe in the importance of self-care and the role it plays in enhancing your natural beauty. Our products are designed to be a part of your daily routine, helping you to feel confident and beautiful every day.</li>
                    </ul>

                    <h3>Our Mission</h3>
                    <p className="mb-4">
                        Our mission is to empower individuals to feel confident and beautiful in their own skin. We strive to create products that not only enhance beauty but also promote overall well-being.
                    </p>

                    <Card>
                        <Card.Body>
                            <h3 className="mb-4">Contact Information</h3>
                            <div>
                                <i className="far fa-envelope"></i>&nbsp;
                                Email: <a href="mailto:support@clarins.com">support@clarins.com</a>
                            </div>
                            <div>
                                <i className="fas fa-phone"></i>&nbsp;
                                Phone: +33 1 40 69 85 00
                            </div>
                            <div>
                                <i className="fas fa-location-dot"></i>&nbsp;
                                Address: 27 Avenue Montaigne, 75008 Paris, France
                            </div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    )
}