import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function DialogoBebidas({
  open,
  onClose,
  bebidas,
  onAdicionarBebida,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: "8px",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Selecione uma Bebida
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          {bebidas.map((bebida) => (
            <ListItem
              key={bebida.id}
              divider
              sx={{
                display: "flex",
                justifyContent: "space-between", // Espaça os elementos
                alignItems: "center", // Alinha verticalmente
              }}
            >
              <ListItemText
                primary={bebida.nome}
                secondary={`R$ ${bebida.preco.toFixed(2)}`}
              />
              <Box>
                <IconButton
                  edge="end"
                  color="primary"
                  onClick={() => onAdicionarBebida(bebida)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}