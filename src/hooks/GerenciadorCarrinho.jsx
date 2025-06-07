import React, { createContext, useContext, useState } from "react";

const CarrinhoContext = createContext();

export function GerenciadorCarrinhoProvider({ children }) {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  function adicionarItem(item) {
    setItensCarrinho((prev) => [...prev, item]);
  }

  function limparCarrinho() {
    setItensCarrinho([]);
  }

  return (
    <CarrinhoContext.Provider value={{ itensCarrinho, adicionarItem, limparCarrinho }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useGerenciadorCarrinho() {
  return useContext(CarrinhoContext);
}