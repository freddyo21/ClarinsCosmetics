import { Spinner } from "react-bootstrap";

export default function SuspenseFallback() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <Spinner animation="border" variant="success" /> &nbsp;
            <h1>Page is Loading...</h1>
        </div>
    );
}