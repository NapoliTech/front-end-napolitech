import React from 'react';
import { Image } from '../atoms/Image';

export function ImageCard({ src, alt }) {
  return (
    <div className="carroselImgs cardImgs" style={{overflow: 'hidden', width: '10px',height: '100vh'}}>
      <Image src={src} alt={alt} className="imgs" />
    </div>
  );
}