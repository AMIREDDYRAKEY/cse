import React from "react";

const Loader = () => {
    return (
        <div className="loader-screen">
            {/* Background effects */}
            <div className="loader-bg-glow loader-bg-glow-1" />
            <div className="loader-bg-glow loader-bg-glow-2" />

            {/* Spinning ring */}
            <div className="loader-ring-container">
                <div className="loader-ring" />

                {/* Logo */}
                <div className="loader-logo">
                    <div className="loader-logo-icon">C</div>
                </div>
            </div>

            {/* Text */}
            <div className="loader-text-group">
                <h1 className="loader-title">
                    CSE <span className="loader-title-accent"></span>
                </h1>
                <p className="loader-subtitle">Loading Resources...</p>
            </div>

            {/* Progress bar */}
            <div className="loader-progress-track">
                <div className="loader-progress-bar" />
            </div>
        </div>
    );
};

export default Loader;
