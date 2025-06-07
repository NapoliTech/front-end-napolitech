import React from 'react';

export function Image({ src, alt, className, style }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        objectFit: "cover",
        objectPosition: "center",
        // display: "block",
        // ...style,
        overflow: 'hidden'
      }}
    />
  );
}