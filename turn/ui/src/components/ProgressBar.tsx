import React from "react";
import { CSSProperties } from 'react';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
    const progressBarContainerStyle: CSSProperties = {
        height: '30px',
        width: '100%',
        backgroundColor: '#ddd',
        borderRadius: '4px',
        margin: '10px 0'
    };

    const progressBarStyle: CSSProperties = {
        height: '100%',
        width: `${progress}%`,
        backgroundColor: progress > 50 ? 'green' : 'red',
        borderRadius: 'inherit',
        textAlign: 'center' as const,
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'width 0.3s ease-in-out'
    };

    return (
        <div style={progressBarContainerStyle}>
            <div
                style={progressBarStyle}
                role="progressbar"
                aria-valuenow={progress} // This is a number
                aria-valuemin={0} // Numeric value
                aria-valuemax={100} // Numeric value
            >
                {progress}%
            </div>
        </div>
    );
};

export default ProgressBar;
