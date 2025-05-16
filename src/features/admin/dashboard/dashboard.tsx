import { Card, Table } from "react-bootstrap";
import "./dashboard.css";
import "rsuite/dist/rsuite.min.css";

export default function AdminDashboard() {
    return (
        <div className="admin__dashboard-container">
            <div className="mb-3">
                <h1 className="text-2xl">Dashboard</h1>
                <p>Welcome to the admin dashboard!</p>
            </div>

            <div className="admin__dashboard-stats-cards">
                <Card>
                    <Card.Header style={{ backgroundColor: "#090", color: "#fff" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-lg font-bold">Revenue</h2>
                            <i className="fas fa-dollar"></i>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-2xl font-bold">$12,345</p>
                        <div className={"text-sm text-success"}>
                            <span className="me-1">+2.5%</span>
                            <i className="fas fa-arrow-up-long"></i>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header style={{ backgroundColor: "#ffc400", color: "#fff" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-lg font-bold">Products</h2>
                            <i className="fas fa-boxes-stacked"></i>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-2xl font-bold">456</p>
                        <div className={"text-sm text-success"}>
                            <span className="me-1">+12.5%</span>
                            <i className="fas fa-arrow-up-long"></i>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header style={{ backgroundColor: "#1080db", color: "#fff" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-lg font-bold">Customers</h2>
                            <i className="fas fa-users"></i>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-2xl font-bold">800</p>
                        <div className={"text-sm text-success"}>
                            <span className="me-1">+3.8%</span>
                            <i className="fas fa-arrow-up-long"></i>
                        </div>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header style={{ backgroundColor: "#d00", color: "#fff" }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <h2 className="text-lg font-bold">Orders</h2>
                            <i className="fas fa-file-lines"></i>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <p className="text-2xl font-bold">2500</p>
                        <div className={"text-sm text-danger"}>
                            <span className="me-1">-0.5%</span>
                            <i className="fas fa-arrow-down-long"></i>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <div className="admin__dashboard-general-info-cards">
                <h2 className="text-2xl font-bold">Recent Activity</h2>
                <div className="admin__dashboard-general-info-cards-container">
                    <div className="admin__dashboard-recent-activities">
                        <Card>
                            <Card.Body>
                                <h3 className="text-xl font-bold mb-2">Recent Orders</h3>
                                <div className="overflow-x-auto">
                                    <Table striped hover responsive>
                                        <thead>
                                            <tr className="border-b">
                                                <th className="py-2 text-left font-medium">Order ID</th>
                                                <th className="py-2 text-left font-medium">Customer</th>
                                                <th className="py-2 text-left font-medium">Status</th>
                                                <th className="py-2 text-left font-medium">Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {orders.map((order) => (
                                                <tr key={order.id} className="border-b last:border-0">
                                                    <td className="py-2">{order.id}</td>
                                                    <td className="py-2">{order.customer}</td>
                                                    <td className="py-2">
                                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                                                            {order.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-2">${order.amount}</td>
                                                </tr>
                                            ))} */}
                                        </tbody>
                                    </Table>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>

                    <div className="admin__dashboard-general-statistics">
                        <Card>
                            <Card.Body>
                                <h3 className="text-xl font-bold mb-2">Quick Stats</h3>
                                <div className="admin__dashboard-quick-stats">
                                    <div className="d-flex justify-content-between text-md">
                                        <span className="text-muted">New Sign-ups</span>
                                        <span className="font-bold">45</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-md">
                                        <span className="text-muted">Pending Orders</span>
                                        <span className="font-bold">12</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-md">
                                        <span className="text-muted">Bounce Rate</span>
                                        <span className="font-bold">42.8%</span>
                                    </div>
                                    <div className="d-flex justify-content-between text-md">
                                        <span className="text-muted">Active Promotions</span>
                                        <span className="font-bold">3</span>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}