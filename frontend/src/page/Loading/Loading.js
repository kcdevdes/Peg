import React from 'react';
import './style.css';

function Loading() {
    return (
        <div className="loading-screen">
           <div className="spinner-container">
                <div className="spinner"></div>
            </div>
            
            <h2 className="loading-text">Analyzing
                <span className="dots-container">
                    <span className="dots">
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                    </span>
                </span>
            </h2>
        </div>
    );
}

export default Loading;
