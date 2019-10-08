import React from 'react';

const DefaultAvatarIcon = props => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="20" fill="url(#paint0_linear)"/>
        <path
            d="M20 12C21.0609 12 22.0783 12.4214 22.8284 13.1716C23.5786 13.9217 24 14.9391 24 16C24 17.0609 23.5786 18.0783 22.8284 18.8284C22.0783 19.5786 21.0609 20 20 20C18.9391 20 17.9217 19.5786 17.1716 18.8284C16.4214 18.0783 16 17.0609 16 16C16 14.9391 16.4214 13.9217 17.1716 13.1716C17.9217 12.4214 18.9391 12 20 12Z"
            fill="white"/>
        <rect x="12" y="23" width="16" height="6" rx="3" fill="white"/>
        <defs>
            <linearGradient id="paint0_linear" x1="0" y1="0" x2="15.1446" y2="47.8644" gradientUnits="userSpaceOnUse">
                <stop stopColor="#9CD4FF"/>
                <stop offset="1" stopColor="#8465FF"/>
                <stop offset="1" stopColor="#8465FF"/>
            </linearGradient>
        </defs>
    </svg>
);

export default DefaultAvatarIcon;