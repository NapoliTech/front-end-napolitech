import React from 'react';

export function Indicator({ isActive }) {
  return <hr className={`indicator ${isActive ? 'active' : ''}`} />;
}