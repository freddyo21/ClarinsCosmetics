import { Row, Col, FormLabel, FormControl, Button } from "react-bootstrap";
import createMessage from "../../../services/general/contact-us/contact-us.service";
import { toastrError, toastrSuccess } from "../../../utils/toastr";

export default function ContactUsForm() {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission logic here
        const formData = new FormData(e.currentTarget);
        createMessage(formData).then(response => {
            if (response.status === 201) {
                toastrSuccess("Success", "Your message has been sent successfully!");
            }
        }).catch(error => {
            toastrError("Error", error.response.data.errors || "An error occurred while sending your message.");
        });
    }

    return (
        <form onSubmit={handleSubmit} className="contact-us__form">
            <Row className="mb-3">
                <Col xs={6}>
                    <div>
                        <FormLabel>Name</FormLabel>
                        <FormControl name="name" placeholder="Your Name" required />
                    </div>
                </Col>
                <Col xs={6}>
                    <div>
                        <FormLabel>Email</FormLabel>
                        <FormControl type="email" name="email" placeholder="Your Email" required />
                    </div>
                </Col>
            </Row>
            <div className="mb-3">
                <FormLabel>Subject</FormLabel>
                <FormControl name="subject" placeholder="Input subject of your message" required />
            </div>
            <div className="mb-3">
                <FormLabel>Message</FormLabel>
                <FormControl as="textarea" name="message" rows={5} placeholder="Your Message" />
            </div>
            <div className="d-flex justify-content-end">
                <Button variant="primary" type="submit">Send Message</Button>
            </div>
        </form>
    )
}