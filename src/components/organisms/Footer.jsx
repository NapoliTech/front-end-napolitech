// filepath: Footer.jsx
import React from 'react';
import Contato from '../molecules/Contato';

export default function Footer() {
  return (
    <footer 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginTop: '50px',
        boxSizing: 'border-box'
      }}
    
    >
      <Contato />
    </footer>
  );
}