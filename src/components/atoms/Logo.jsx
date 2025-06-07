import React from 'react';


export function Logo({ src, alt, className }) {
    return <img src={src} alt={alt} className={className} style={{width: '200px'}} />;
}