import React from 'react';
import { Box } from '@mui/material';
import HeaderMUI from '../molecules/headerMUI.jsx';

export function Home() {
    return (
      <body
        style={{ backgroundColor: "#EEEDE8", margin: 0, padding: 0, display: "flex", flexDirection: "column",  }}
      >
        <HeaderMUI />
      </body>
    );
}