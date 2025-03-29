import React from 'react';
import { Image } from '../atoms/Image';

export function ImageCard({ src, alt }) {
  return (
    <div className="carroselImgs cardImgs">
      <Image src={src} alt={alt} className="imgs" />
    </div>
  );
}