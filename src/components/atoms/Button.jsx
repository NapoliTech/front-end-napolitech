import React from 'react';

export function Button({ type, textoBtt, className, id }) {
  return (
    <button type={type} className={className} id={id}>
      {textoBtt}</button>
  );
}