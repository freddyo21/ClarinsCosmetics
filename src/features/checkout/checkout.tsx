import { useEffect, useState } from "react";
import "./checkout.css";
import { CheckoutSteps } from "../../components/general/checkout/CheckoutSteps";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { toastrError } from "../../utils/toastr";

type CheckoutStep = "shipping" | "payment" | "summary" | "complete";

export default function Checkout() {
    const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping");
    const [shippingInfo, setShippingInfo] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        country: "Vietnam",
    });

    const navigate = useNavigate();

    // useEffect(() => {
    //     const token = new Cookies().get("user-token");

    //     if (!token) {
    //         navigate("/login");
    //         toastrError("Error", "You need to login to access the checkout page.");
    //     }
    // }, []);

    return (
        <div className="checkout">
            <div className="min-h-screen bg-gray-50">
                <div className="px-3 pt-2 pb-4">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-2xl font-bold text-gray-900">
                            {currentStep === "complete" ? "Order Complete" : "Checkout"}
                        </div>

                        <div className="w-24"></div> {/* Spacer for alignment */}
                    </div>

                    {currentStep !== "complete" && (
                        <CheckoutSteps currentStep={currentStep} />
                    )}

                    <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main content area */}
                        <div className="lg:col-span-2 space-y-8">
                            {currentStep === "shipping" && (
                                // <ShippingForm
                                //     initialValues={shippingInfo}
                                //     onSubmit={handleShippingSubmit}
                                // />
                                <></>
                            )}

                            {currentStep === "payment" && (
                                // <PaymentForm
                                //     onSubmit={handlePaymentSubmit}
                                //     onBack={() => setCurrentStep("shipping")}
                                //     selectedMethod={paymentMethod}
                                // />
                                <></>
                            )}

                            {currentStep === "summary" && (
                                <div className="bg-white p-6 rounded-xl shadow-sm">
                                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                                    <div className="space-y-4 mb-6">
                                        {/* <div className="flex justify-between pb-4 border-b">
                                            <h3 className="font-medium">Shipping Information</h3>
                                            <Button
                                                variant="ghost"
                                                onClick={() => setCurrentStep("shipping")}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                            <p><span className="font-medium">Name:</span> {shippingInfo.fullName}</p>
                                            <p><span className="font-medium">Email:</span> {shippingInfo.email}</p>
                                            <p><span className="font-medium">Address:</span> {shippingInfo.address}</p>
                                            <p><span className="font-medium">City:</span> {shippingInfo.city}</p>
                                            <p><span className="font-medium">State:</span> {shippingInfo.state}</p>
                                            <p><span className="font-medium">Zip Code:</span> {shippingInfo.zipCode}</p>
                                            <p><span className="font-medium">Country:</span> {shippingInfo.country}</p>
                                        </div> */}
                                    </div>

                                    <div className="space-y-4 mb-8">
                                        {/* <div className="flex justify-between pb-4 border-b">
                                            <h3 className="font-medium">Payment Method</h3>
                                            <Button
                                                variant="ghost"
                                                onClick={() => setCurrentStep("payment")}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                        <p className="text-sm capitalize">{paymentMethod.replace("-", " ")}</p> */}
                                    </div>

                                    {/* <Button
                                        onClick={handlePlaceOrder}
                                        className="w-full bg-blue-600 hover:bg-blue-700"
                                        disabled={isProcessing}
                                    >
                                        {isProcessing ? "Processing..." : "Place Order"}
                                    </Button> */}
                                </div>
                            )}

                            {currentStep === "complete" && (
                                // <CheckoutComplete />
                                <></>
                            )}
                        </div>

                        {/* Order summary sidebar */}
                        {currentStep !== "complete" && (
                            <div className="lg:col-span-1">
                                {/* <OrderSummary
                                    items={mockCartItems}
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    tax={tax}
                                    total={total}
                                /> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}