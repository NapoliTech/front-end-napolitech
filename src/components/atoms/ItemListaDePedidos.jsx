import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Acordeon from "./Acordeon";

export default function ItemListaDePedidos({
  sabor,
  texto,
  preco,
  adicionarAoPedido,
  produto,
}) {
  // Função para lidar com a seleção do item
  const handleSelecionar = () => {
    if (adicionarAoPedido && produto) {
      adicionarAoPedido(produto);
      console.log(`Produto selecionado: ${produto.nome}`);
    }
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
      }}
      component="nav"
    >
      <ListItemButton
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <ListItemIcon>
          <Acordeon sabor={sabor} preco={preco} texto={texto} />
        </ListItemIcon>
        {adicionarAoPedido && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSelecionar}
            sx={{
              padding: '8px',
              marginLeft: "auto", 
              width: 'auto',
              height: 'auto'
            }}
          >
            Selecionar
          </Button>
        )}
      </ListItemButton>
    </List>
  );
}