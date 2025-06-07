import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  IconButton,
  Divider,
  Tooltip,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { getPedidosUsuario } from "../../services/carrinhoService";

// Função simples para decodificar JWT (payload em base64)
function decodeJWT(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

// Função para retornar cor e ícone do status
function getStatusProps(status) {
  switch (status) {
    case "RECEBIDO":
      return { color: "info", icon: <HourglassEmptyIcon fontSize="small" /> };
    case "CONCLUIDO":
      return { color: "success", icon: <CheckCircleIcon fontSize="small" /> };
    case "CANCELADO":
      return { color: "error", icon: <CancelIcon fontSize="small" /> };
    default:
      return { color: "default", icon: <InfoOutlinedIcon fontSize="small" /> };
  }
}

export default function ModalCarrinho({ aberto, fecharModal, token }) {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPedidos = async () => {
    if (token) {
      setLoading(true);
      const decoded = decodeJWT(token);
      const userId = decoded?.id || decoded?.userId || decoded?.sub;
      if (userId) {
        const data = await getPedidosUsuario(userId);
        setPedidos(data.pedidosRealizados || []);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (aberto) {
      fetchPedidos();
    }
    // eslint-disable-next-line
  }, [aberto, token]);

  return (
    <Modal open={aberto} onClose={fecharModal} aria-labelledby="modal-carrinho">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "95vw", sm: 500, md: 600 },
          maxHeight: { xs: "90vh", md: "90vh" },
          bgcolor: "#fff",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "grey.700",
            transition: "color 0.2s",
            "&:hover": { color: "error.main", bgcolor: "grey.100" },
          }}
          onClick={fecharModal}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2, gap: 1, justifyContent: "center" }}>
          <ShoppingCartIcon color="primary" fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Pedidos Recebidos
          </Typography>
        </Box>

        {loading ? (
          <Typography variant="body1" sx={{ textAlign: "center", my: 4 }}>
            Atualizando pedidos...
          </Typography>
        ) : pedidos.length > 0 ? (
          <List sx={{ maxHeight: { xs: "60vh", md: "65vh" }, overflow: "auto" }}>
            {pedidos.map((pedido, idx) => {
              const statusProps = getStatusProps(pedido.statusPedido);
              return (
                <React.Fragment key={pedido.id}>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      bgcolor: "#f8fafc",
                      borderRadius: 2,
                      mb: 2,
                      boxShadow: 1,
                      transition: "box-shadow 0.2s, background 0.2s",
                      "&:hover": {
                        boxShadow: 4,
                        bgcolor: "#e3f2fd",
                      },
                      width: "100%",
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                        Pedido #{pedido.id}
                      </Typography>
                      <Tooltip title={pedido.statusPedido}>
                        <Chip
                          icon={statusProps.icon}
                          label={pedido.statusPedido}
                          color={statusProps.color}
                          size="small"
                          sx={{ fontWeight: "bold", ml: 1 }}
                        />
                      </Tooltip>
                    </Box>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Data:</strong> {new Date(pedido.dataPedido).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 0.5 }}>
                      <strong>Total:</strong> R$ {pedido.precoTotal.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 1, width: "100%" }}>
                      <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
                        Produtos:
                      </Typography>
                      <List dense sx={{ pl: 2 }}>
                        {pedido.itens.map((item, i) => (
                          <ListItem key={i} sx={{ py: 0.5, px: 0, alignItems: "flex-start" }}>
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                                {item.produto.nome}{" "}
                                <Chip
                                  label={item.produto.categoriaProduto}
                                  size="small"
                                  color="primary"
                                  sx={{ ml: 1, fontWeight: "bold" }}
                                />
                              </Typography>
                              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                                Ingredientes: {item.produto.ingredientes}
                              </Typography>
                              <Typography variant="body2">
                                Preço: <strong>R$ {item.produto.preco.toFixed(2)}</strong>
                              </Typography>
                              <Typography variant="body2">
                                Quantidade: <strong>{item.quantidade}</strong>
                              </Typography>
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  </ListItem>
                  {idx < pedidos.length - 1 && <Divider />}
                </React.Fragment>
              );
            })}
          </List>
        ) : (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <InfoOutlinedIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
            <Typography variant="body1" sx={{ color: "grey.600" }}>
              Nenhum pedido recebido.
            </Typography>
          </Box>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            onClick={fetchPedidos}
            variant="outlined"
            color="primary"
            size="large"
            startIcon={<RefreshIcon />}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              transition: "background 0.2s",
              "&:hover": {
                backgroundColor: "primary.light",
              },
            }}
            disabled={loading}
          >
            Atualizar
          </Button>
          <Button
            onClick={fecharModal}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              transition: "background 0.2s",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}