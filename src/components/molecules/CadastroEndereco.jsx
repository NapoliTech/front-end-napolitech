import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Stack,
  CircularProgress,
  Alert,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { api } from "../../provider/apiInstance";


export default function CadastroEndereco({ userId }) {
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    complemento: "",
    cidade: "",
    estado: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [naoSeiCep, setNaoSeiCep] = useState(false);

  const estados = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    if ((name === "cep" || name === "numero") && !/^\d*$/.test(value)) {
      setFieldErrors((prev) => ({
        ...prev,
        [name]: "Este campo deve conter apenas números.",
      }));
      return;
    }

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBuscarEnderecoPorCep = async () => {
    if (formData.cep.length !== 8) {
      setError("O CEP deve ter 8 dígitos.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`);
      if (response.data.erro) {
        throw new Error("CEP não encontrado.");
      }

      setFormData((prev) => ({
        ...prev,
        rua: response.data.logradouro || "",
        bairro: response.data.bairro || "",
        cidade: response.data.localidade || "",
        estado: response.data.uf || "",
      }));
      setError(""); // Limpa o erro se o CEP for encontrado
    } catch (err) {
      setError(err.message || "Erro ao buscar o endereço pelo CEP.");
    } finally {
      setLoading(false);
    }
  };

  const handleBuscarCepPorEndereco = async () => {
    if (!formData.rua || !formData.bairro || !formData.cidade || !formData.estado) {
      setError("Preencha os campos Estado, Cidade, Rua e Bairro para buscar o CEP.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://viacep.com.br/ws/${formData.estado}/${formData.cidade}/${formData.rua}/json/`
      );

      const enderecoEncontrado = response.data.find(
        (endereco) => endereco.bairro.toLowerCase() === formData.bairro.toLowerCase()
      );

      if (!enderecoEncontrado) {
        throw new Error("Não foi possível encontrar o CEP com os dados fornecidos.");
      }

      setFormData((prev) => ({
        ...prev,
        cep: enderecoEncontrado.cep || "",
      }));
      setNaoSeiCep(false); // Desmarca a opção "Não sei meu CEP"
      setError(""); // Limpa o erro se o CEP for encontrado
    } catch (err) {
      setError(err.message || "Erro ao buscar o CEP.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("ID do usuário não encontrado. Tente novamente.");
      return;
    }

    const requiredFields = ["cep", "rua", "numero", "bairro", "cidade", "estado"];
    const newFieldErrors = {};

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newFieldErrors[field] = "Este campo é obrigatório.";
      }
    });

    if (Object.keys(newFieldErrors).length > 0) {
      setFieldErrors(newFieldErrors);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const payload = {
        rua: formData.rua,
        numero: parseInt(formData.numero, 10), // Converte para número
        bairro: formData.bairro,
        complemento: formData.complemento || "", // Garante que o complemento seja uma string
        cidade: formData.cidade,
        estado: formData.estado,
        cep: formData.cep,
        usuarioId: userId, // Envia o ID do usuário como "usuarioId"
      };

      const response = await api.post("/api/enderecos", payload);

      console.log("Resposta do backend:", response.data);
      setSuccess(true);
      alert("Endereço cadastrado com sucesso!");

      // Limpa o formulário após sucesso
      setFormData({
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        complemento: "",
        cidade: "",
        estado: "",
      });
    } catch (err) {
      console.error("Erro ao enviar os dados:", err);
      setError(err.response?.data?.message || "Ocorreu um erro ao cadastrar o endereço.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={naoSeiCep ? (e) => e.preventDefault() : handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        width: "100%",
        height: "100%",
        padding: 3,
        backgroundColor: "#f5f5f5",
        borderRadius: 2,
        boxShadow: 3,
        overflowY: "auto",
      }}
    >
      <Typography variant="h5" textAlign="center" gutterBottom>
        Cadastro de Endereço
      </Typography>

      {/* Checkbox para "Não sei meu CEP" */}
      <FormControlLabel
        control={
          <Checkbox
            checked={naoSeiCep}
            onChange={(e) => {
              setNaoSeiCep(e.target.checked);
              if (e.target.checked) {
                setFormData((prev) => ({ ...prev, cep: "" }));
                setError("");
              }
            }}
          />
        }
        label="Não sei meu CEP"
      />

      {/* CEP */}
      <TextField
        fullWidth
        label="CEP"
        name="cep"
        value={formData.cep}
        onChange={handleChange}
        onBlur={!naoSeiCep ? handleBuscarEnderecoPorCep : undefined}
        variant="outlined"
        disabled={loading || naoSeiCep}
        error={!!error || !!fieldErrors.cep}
        helperText={error || fieldErrors.cep || "Digite o CEP e saia do campo para buscar."}
      />

      {loading && (
        <Stack direction="row" justifyContent="center">
          <CircularProgress />
        </Stack>
      )}

      {/* Rua e Número */}
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Rua"
          name="rua"
          value={formData.rua}
          onChange={handleChange}
          variant="outlined"
          disabled={loading}
          error={!!fieldErrors.rua}
          helperText={fieldErrors.rua}
          sx={{ flex: 4 }}
        />
        <TextField
          fullWidth
          label="Número"
          name="numero"
          value={formData.numero}
          onChange={handleChange}
          variant="outlined"
          disabled={loading}
          error={!!fieldErrors.numero}
          helperText={fieldErrors.numero || "O número é obrigatório."}
          sx={{ flex: 1 }}
        />
      </Stack>

      {/* Bairro */}
      <TextField
        fullWidth
        label="Bairro"
        name="bairro"
        value={formData.bairro}
        onChange={handleChange}
        variant="outlined"
        disabled={loading}
        error={!!fieldErrors.bairro}
        helperText={fieldErrors.bairro}
      />

      {/* Complemento */}
      <TextField
        fullWidth
        label="Complemento"
        name="complemento"
        value={formData.complemento}
        onChange={handleChange}
        variant="outlined"
        disabled={loading}
      />

      {/* Cidade e Estado */}
      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Cidade"
          name="cidade"
          value={formData.cidade}
          onChange={handleChange}
          variant="outlined"
          disabled={loading}
          error={!!fieldErrors.cidade}
          helperText={fieldErrors.cidade}
          sx={{ flex: 4 }}
        />
        <TextField
          fullWidth
          select
          label="Estado"
          name="estado"
          value={formData.estado}
          onChange={handleChange}
          variant="outlined"
          disabled={loading}
          error={!!fieldErrors.estado}
          helperText={fieldErrors.estado}
          sx={{ flex: 1 }}
        >
          {estados.map((estado) => (
            <MenuItem key={estado} value={estado}>
              {estado}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      {/* Botões */}
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            setFormData({
              cep: "",
              rua: "",
              numero: "",
              bairro: "",
              complemento: "",
              cidade: "",
              estado: "",
            });
            setFieldErrors({});
            setError("");
          }}
          disabled={loading}
        >
          Limpar
        </Button>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={naoSeiCep ? handleBuscarCepPorEndereco : handleSubmit}
          disabled={loading || (naoSeiCep && (!formData.rua || !formData.bairro || !formData.cidade || !formData.estado))}
        >
          {naoSeiCep ? "Preencher CEP" : "Salvar"}
        </Button>
      </Stack>

      {/* Erro geral */}
      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}