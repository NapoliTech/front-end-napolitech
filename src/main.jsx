import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CssBaseline } from '@mui/material'; // Importa o CssBaseline
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <CssBaseline /> {/* Aplica os estilos globais do Material-UI */}
      <App />
    </>
  </StrictMode>,
);