import { apiChatBot } from "../provider/apiInstance";

// Exemplo de função para enviar mensagem ao backend Flask
async function enviarMensagem(mensagem) {
  try {
    const resposta = await apiChatBot.post("chat", {
      msg: mensagem,
    });
    console.log("Resposta do backend:", resposta.data);
    // Retorne a resposta para o componente React
    return resposta.data || "Desculpe, não entendi. Tente novamente.";
  } catch (erro) {
    console.error("Erro ao chamar o backend:", erro);
    return "Erro ao se comunicar com o assistente. Tente novamente.";
  }
}

// Exporta como objeto para usar: chatBotService.enviarMensagem
export const chatBotService = { enviarMensagem };