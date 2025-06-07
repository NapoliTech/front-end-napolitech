import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  CardHeader,
  FormControlLabel,
  Checkbox,
  Divider,
  TextField,
  Button,
  Modal,
} from "@mui/material";
import { api } from "../../provider/apiInstance";

export default function FinalizarPedido() {
  const location = useLocation();
  const navigate = useNavigate();

  // Recupera os dados passados via state ou define valores padrão
  const {
    userId,
    enderecoSelecionado,
    pizzasSelecionadas = [],
    tamanhoSelecionado,
    bordaSelecionada,
  } = location.state || {};


  // Estado para os checkboxes
  const [isEntrega, setIsEntrega] = useState(false);
  const [isRetirada, setIsRetirada] = useState(false);

  // Estado para a observação
  const [observacao, setObservacao] = useState("");

  // Estado para o modal
  const [modalOpen, setModalOpen] = useState(false);

  // Estado para armazenar o payload do pedido
  const [pedidoPayload, setPedidoPayload] = useState(null);

  // Adiciona logs para verificar os dados recebidos
  useEffect(() => {
    console.log("Dados recebidos na página FinalizarPedido:");
    console.log("userId:", userId);
    console.log("Endereço selecionado:", enderecoSelecionado);
    console.log("Pizzas selecionadas:", pizzasSelecionadas);
  }, [userId, enderecoSelecionado, pizzasSelecionadas]);

  // Redireciona para a página inicial se os dados necessários não estiverem disponíveis
  if (!userId || !enderecoSelecionado) {
    console.error("Dados insuficientes para finalizar o pedido.");
    navigate("/pedidos"); // Redireciona para a página de pedidos
    return null;
  }

  // Calcula o total do pedido
  const calcularTotal = () => {
    return pizzasSelecionadas
      .reduce((total, pizza) => total + parseFloat(pizza.preco || 0), 0)
      .toFixed(2);
  };

  // Lógica para alternar entre os checkboxes
  const handleCheckboxChange = (type) => {
    if (type === "entrega") {
      setIsEntrega(!isEntrega);
      if (!isEntrega) setIsRetirada(false); // Desmarca "Retirada" se "Entrega" for selecionado
    } else if (type === "retirada") {
      setIsRetirada(!isRetirada);
      if (!isRetirada) setIsEntrega(false); // Desmarca "Entrega" se "Retirada" for selecionado
    }
  };

  const finalizarPedido = async () => {
    const payload = {
      clienteId: userId,
      itens: pizzasSelecionadas.map((pizza) => ({
        produto: pizza.metades.map((metade) => metade.id),
        quantidade: 1,
        bordaRecheada: bordaSelecionada,
        tamanhoPizza: tamanhoSelecionado 
      })),
      observacao: observacao || "",
      tipoEntrega: isEntrega ? "ENCOMENDA" : "RETIRADA",
    };

    console.log("Payload enviado para a API:", payload);

    try {
      const response = await api.post("/api/pedidos", payload);
      console.log("Pedido enviado com sucesso:", response.data);
      setPedidoPayload(payload); // Armazena o payload no estado
      setModalOpen(true); // Abre o modal ao concluir o pedido
    } catch (error) {
      console.error("Erro ao enviar o pedido:", error);
      alert("Erro ao finalizar o pedido. Tente novamente.");
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100vw",
          height: "70vh",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        {/* Card para informações do pedido */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "24px",
          }}
        >
          <Card
            sx={{
              width: "90%",
              maxWidth: "600px",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: 3,
              border: "1px solid #ddd",
            }}
          >
            <CardHeader
              title="Seu Pedido"
              sx={{
                backgroundColor: "#B72A23",
                color: "#fff",
                textAlign: "center",
                padding: "16px",
                fontSize: "1.5rem",
              }}
            />
            <CardContent
              sx={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Typography variant="subtitle1">
                <strong>Endereço Selecionado:</strong>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {enderecoSelecionado.rua}, {enderecoSelecionado.numero} - {enderecoSelecionado.bairro}, {enderecoSelecionado.cidade} - {enderecoSelecionado.estado}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Pizzas Selecionadas:</strong>
              </Typography>
              {pizzasSelecionadas.length > 0 ? (
                <Box component="ul" sx={{ paddingLeft: "16px", margin: 0 }}>
                  {pizzasSelecionadas.map((pizza, index) => (
                    <Box component="li" key={index} sx={{ marginBottom: "8px" }}>
                      <Typography variant="body2">
                        <strong>Meia Pizza de {pizza.metades[0].sabor} / Meia Pizza de {pizza.metades[1].sabor}</strong> - R$ {pizza.preco}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              ) : (
                <Typography variant="body2">Nenhuma pizza selecionada.</Typography>
              )}
              <Typography variant="h6" sx={{ marginTop: "16px", textAlign: "right" }}>
                <strong>Total:</strong> R$ {calcularTotal()}
              </Typography>
            </CardContent>
            <Box sx={{ padding: "16px" }}>
              <TextField
                label="Adicionar Observação"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                value={observacao}
                onChange={(e) => setObservacao(e.target.value)}
              />
            </Box>
          </Card>
        </Box>

        {/* Divisória e checkboxes */}
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: "24px",
            paddingLeft: "32px",
          }}
        >
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              position: "absolute",
              left: "50%",
              height: "500px",
              backgroundColor: "#000",
              width: "2px",
            }}
          />
          <Typography variant="h5" sx={{ marginBottom: "16px" }}>
            Escolha a forma de recebimento:
          </Typography>
          <FormControlLabel
            control={
              <Checkbox
                checked={isEntrega}
                onChange={() => handleCheckboxChange("entrega")}
                color="primary"
              />
            }
            label="Entrega"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isRetirada}
                onChange={() => handleCheckboxChange("retirada")}
                color="primary"
              />
            }
            label="Retirada"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          paddingTop: "16px",
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#197824",
            color: "#fff",
            padding: "10px 20px",
            height: "auto",
            width: "auto",
          }}
          onClick={finalizarPedido}
        >
          Finalizar Pedido
        </Button>
      </Box>

      {/* Modal de Pedido Concluído */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Pedido Concluído com Sucesso!
          </Typography>
          <Typography id="modal-description" sx={{ mb: 2 }}>
            Seu pedido foi finalizado com sucesso. Clique no botão abaixo para visualizar os detalhes.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModalOpen(false);
              navigate("/pedidoConcluido", { state: { pedido: pedidoPayload } }); // Envia o payload para a página de Pedido Concluído
            }}
            fullWidth
          >
            Ver Pedido
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}