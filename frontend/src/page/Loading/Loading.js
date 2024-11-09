import React from 'react';
import './style.css';

function Loading() {
    return (
        <div className="loading-screen">
           <div className="spinner-container">
                <div className="spinner"></div>
            </div>
            
            <p className="loading-text">Loading...</p>
        </div>
    );
}

export default Loading;
