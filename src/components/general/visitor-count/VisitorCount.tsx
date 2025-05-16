import "./VisitorCount.css";
import { useEffect, useState } from "react";


export default function VisitorCount() {
    const [visitorCount, setVisitorCount] = useState(0);

    useEffect(() => {
        // Simulate visitor count, in real app this should come from server
        const count = localStorage.getItem("visitorCount");
        const newCount = count ? parseInt(count) + 1 : 1;
        localStorage.setItem("visitorCount", newCount.toString());
        setVisitorCount(newCount);
    }, []);

    return (
        <>
            <div className="visitor-count">
                Visitors: {visitorCount}
            </div>
        </>
    )
}