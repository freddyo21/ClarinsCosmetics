import { Card } from "react-bootstrap";
import "./contact-us.css"; // Import the CSS file for the contact us styles
import ContactUsForm from "../../components/general/contact-us/ContactUsForm";

export default function ContactUs() {

    return (
        <>
            <Card className="contact-us__card">
                <Card.Body>
                    <h2>
                        <i className="fas fa-address-book"></i> Contact Us
                    </h2>
                    <div className="d-grid contact-us__container">
                        <div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448.00319432550305!2d105.84916793871542!3d21.003411276151347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac428c3336e5%3A0xb7d4993d5b02357e!2sAptech%20Computer%20Education!5e0!3m2!1svi!2s!4v1681217088507!5m2!1svi!2s"
                                width="100%" height="280" style={{ border: "1px" }} allowFullScreen loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>

                        <div>
                            <h3>Get in Touch</h3>
                            <p>We'd love to hear from you! Whether you have questions about our products, need assistance with an order,
                                or just want to share your experience with Clarins, our customer support team is here to help.</p>

                            <h3 className="mb-3">Contact Information</h3>
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
                        </div>
                    </div>

                    <Card className="mb-4">
                        <Card.Body>
                            <h3 className="mb-3">Send us a Message</h3>
                            <ContactUsForm />
                        </Card.Body>
                    </Card>

                    <h3 className="mb-3">Business Hours</h3>
                    <Card>
                        <Card.Body>
                            <p><b>Monday - Friday</b>: 9:00 AM - 6:00 PM</p>
                            <p><b>Saturday</b>: 10:00 AM - 4:00 PM</p>
                            <p><b>Sunday</b>: Closed</p>
                            <div>We aim to respond to all inquiries within 24 hours during business days.
                                If you have an urgent matter, please call us directly at the number provided above.</div>
                        </Card.Body>
                    </Card>
                </Card.Body>
            </Card>
        </>
    )
}