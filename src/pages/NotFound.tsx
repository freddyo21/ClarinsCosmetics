import "./NotFound.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <div className="not-found-container">
        <div id="not-found__message">
          <h2 className="text-xl">Error 404</h2>
          {/* <h1>It seems that you are going to the wrong place...</h1> */}
          <h1 className="text-2xl">It seems that you are going on the wrong route...</h1>
          {/* <p>Đường dẫn bạn đang tìm không tồn tại trên hệ thống. Hay là mình ra ngoài thử lại đi ha?</p> */}
          <p>The route that you are seeking are not existed on the server. Why don't try to go back and look somewhere else?</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
