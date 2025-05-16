import "./ScrollingTicker.css"; // Import the CSS file for the marquee animation

import { useEffect, useState } from "react";

export default function ScrollingTicker() {
  const [dateStr, setDateStr] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const [locationStr, setLocationStr] = useState("Loading location...");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDateStr(now.toLocaleDateString("vi", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }));
      setTimeStr(now.toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Reverse geocode could be added here with an API call for city/state if needed
          setLocationStr(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        () => setLocationStr("Location unavailable"),
        { timeout: 10000 }
      );
    } else {
      setLocationStr("Geolocation not supported");
    }

    return () => clearInterval(interval);
  }, [locationStr]);

  return (
    <div className="py-1 marquee-container">
      <div className="animate-marquee text-center">
        <span className="mx-4 text-md">
          {`Date: ${dateStr} | Time: ${timeStr} | Location: ${locationStr}`}
        </span>
      </div>
    </div>
  );
};
