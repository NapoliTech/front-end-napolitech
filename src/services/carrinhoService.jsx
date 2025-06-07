import {api} from "../provider/apiInstance"

export async function getPedidosUsuario(id) {
  // Retorna todos os pedidos do usuário com o id informado
  const response = await api(`/api/${id}`);
  return response.data;
}