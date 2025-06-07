import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  IconButton,
  TextField,
  Button,
  List,
  ListItem,
  Paper,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import { chatBotService } from "../../services/chatBotService"; // ajuste o caminho se necessário

export default function ModalChatbot({ aberto, fecharModal }) {
  const [mensagem, setMensagem] = useState("");
  const [conversa, setConversa] = useState([
    { remetente: "bot", texto: "Olá! Sou o assistente virtual. Como posso ajudar?" }
  ]);
  const [enviando, setEnviando] = useState(false);
  const listaRef = useRef(null);

  const enviarMensagem = async () => {
    if (!mensagem.trim()) return;
    const msgUsuario = { remetente: "user", texto: mensagem };
    setConversa((prev) => [...prev, msgUsuario]);
    setEnviando(true);
    setMensagem("");
    try {
      const resposta = await chatBotService.enviarMensagem(mensagem);
      setConversa((prev) => [
        ...prev,
        { remetente: "bot", texto: resposta || "Desculpe, não entendi. Tente novamente." }
      ]);
    } catch {
      setConversa((prev) => [
        ...prev,
        { remetente: "bot", texto: "Erro ao se comunicar com o assistente. Tente novamente." }
      ]);
    }
    setEnviando(false);
  };

  useEffect(() => {
    if (listaRef.current) {
      listaRef.current.scrollTop = listaRef.current.scrollHeight;
    }
  }, [conversa]);

  return (
    <Modal open={aberto} onClose={fecharModal} aria-labelledby="modal-chatbot">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "98vw", sm: 600, md: 700 },
          minHeight: { xs: 500, sm: 600 },
          maxHeight: "90vh",
          bgcolor: "#fff",
          boxShadow: 24,
          p: { xs: 2, sm: 4 },
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ position: "absolute", right: 24, top: 24, zIndex: 2 }}>
          <IconButton
            onClick={fecharModal}
            sx={{
              color: "grey.700",
              bgcolor: "grey.100",
              "&:hover": { bgcolor: "grey.200" },
              boxShadow: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3, gap: 1, justifyContent: "center" }}>
          <ChatIcon color="primary" fontSize="large" />
          <Typography variant="h5" sx={{ fontWeight: "bold", color: "primary.main" }}>
            Chatbot IA
          </Typography>
        </Box>
        <Paper
          elevation={1}
          ref={listaRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            bgcolor: "#f8fafc",
            p: 3,
            mb: 3,
            borderRadius: 3,
            maxHeight: { xs: 300, sm: 400, md: 450 },
            minHeight: { xs: 200, sm: 300, md: 350 },
            transition: "box-shadow 0.2s",
          }}
        >
          <List>
            {conversa.map((msg, idx) => (
              <ListItem
                key={idx}
                sx={{
                  justifyContent: msg.remetente === "user" ? "flex-end" : "flex-start",
                  display: "flex",
                  pb: 1,
                  border: "none",
                  background: "none",
                }}
              >
                <Box
                  sx={{
                    bgcolor: msg.remetente === "user" ? "primary.main" : "grey.200",
                    color: msg.remetente === "user" ? "#fff" : "grey.900",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: "75%",
                    fontSize: 16,
                    boxShadow: msg.remetente === "user" ? 2 : 1,
                    wordBreak: "break-word",
                  }}
                >
                  {msg.texto}
                </Box>
              </ListItem>
            ))}
            {enviando && (
              <ListItem
                sx={{
                  justifyContent: "flex-start",
                  display: "flex",
                  pb: 1,
                  border: "none",
                  background: "none",
                }}
              >
                <Box
                  sx={{
                    bgcolor: "grey.200",
                    color: "grey.900",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    maxWidth: "75%",
                    fontSize: 16,
                    fontStyle: "italic",
                  }}
                >
                  Digitando...
                </Box>
              </ListItem>
            )}
          </List>
        </Paper>
        <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
          <TextField
            fullWidth
            size="medium"
            placeholder="Digite sua pergunta..."
            value={mensagem}
            onChange={e => setMensagem(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !enviando && enviarMensagem()}
            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              boxShadow: 1,
            }}
            inputProps={{ style: { fontSize: 16 } }}
            disabled={enviando}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={enviarMensagem}
            disabled={!mensagem.trim() || enviando}
            sx={{
              fontWeight: "bold",
              borderRadius: 2,
              px: 4,
              boxShadow: 2,
              height: 48,
              fontSize: 16,
              transition: "background 0.2s",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}