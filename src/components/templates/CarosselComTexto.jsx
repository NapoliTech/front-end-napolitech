import React from 'react';
import { Carrossel } from '../organisms/Carrossel';
import { TextBonari } from '../organisms/TextBonari';

export function CarosselComTexto({ children }) {
  return (
    <>
      <Carrossel />
      <TextBonari />
      {children}
    </>
  );
}