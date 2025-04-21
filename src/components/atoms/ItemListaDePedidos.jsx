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
    }
  };

  return (
    <List
      sx={{
        width: "100%", // Ajusta para ocupar 100% do espaço disponível no container pai
        bgcolor: "background.paper",
      }}
      component="nav"
    >
      <ListItemButton>
        <ListItemIcon>
          <Acordeon sabor={sabor} preco={preco} texto={texto} />
        </ListItemIcon>
        <ListItemText />
        {adicionarAoPedido && (
          <Box sx={{ ml: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSelecionar}
              sx={{
                width: "100%", // Ajusta para ocupar 100% do espaço disponível no container pai
              }}
            >
              Selecionar
            </Button>
          </Box>
        )}
      </ListItemButton>
    </List>
  );
}
