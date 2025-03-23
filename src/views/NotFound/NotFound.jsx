import React from "react";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-header">404 <br></br>Page Not Found</h1>
        <img src="/src/assets/not_found_page.gif" alt="Not Found" className="not-found-image" />
        <p className="not-found-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <p className="not-found-suggestion">
          You can go back to the <a href="/">Home Page</a>.
        </p>
      </div>
    </div>
  );
};

export default NotFound;
