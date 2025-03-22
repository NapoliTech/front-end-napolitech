import React from 'react';

export function Image({ src, alt, className }) {
  return <img src={src} alt={alt} className={className} />;
}