import "./CheckoutSteps.css";

export const CheckoutSteps = ({ currentStep }: {
    currentStep: "shipping" | "payment" | "summary" | "complete";
}) => {
    const steps = [
        { id: "shipping", label: "Shipping" },
        { id: "payment", label: "Payment" },
        { id: "summary", label: "Summary" },
    ];

    const getStepStatus = (stepId: string) => {
        if (stepId === "shipping" && currentStep !== "shipping") return "completed";
        if (stepId === "payment" && (currentStep === "summary" || currentStep === "complete")) return "completed";
        if (stepId === currentStep) return "current";
        return "upcoming";
    };

    return (
        <div className="d-flex justify-content-center checkout-steps">
            <div className="relative d-flex justify-content-between checkout-steps__container">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id);
                    const isLast = index === steps.length - 1;

                    return (
                        <div key={step.id} className="d-flex flex-col align-items-center checkout-steps__step">
                            {/* Step connector line */}
                            {!isLast && (
                                <div className={`absolute top-4 left-0 h-0.5 ${index * 50}% w-[calc(100%/2)] -translate-x-1/2 
                    ${status === "upcoming" ? "bg-gray-200" : "bg-blue-500"}`}
                                    style={{ left: `${(index + 1) * (100 / (steps.length - 1))}%` }}
                                />
                            )}

                            {/* Step circle */}
                            <div className={`checkout-steps__step-circle`} style={status === "upcoming"
                                ? { borderColor: "#e5e7eb", backgroundColor: "#fff", color: "#9ca3af" }
                                : status === "current"
                                    ? { borderColor: "#3b82f6", backgroundColor: "#fff", color: "#3b82f6" }
                                    : { borderColor: "#3b82f6", backgroundColor: "#3b82f6", color: "#fff" }
                            }>
                                {status === "completed" ? (
                                    <i className="fas fa-check"></i>
                                ) : (
                                    <span className="text-sm">{index + 1}</span>
                                )}
                            </div>

                            {/* Step label */}
                            <span className={`mt-2 text-sm font-medium ${status === "upcoming"
                                ? "text-gray-500"
                                : status === "current"
                                    ? "text-blue-600"
                                    : "text-gray-900"
                                }`}>
                                {step.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div >
    );
};
