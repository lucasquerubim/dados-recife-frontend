const IP_DA_MAQUINA = "192.168.0.10"; 
const BASE_URL = `http://${IP_DA_MAQUINA}:3000`;

export async function salvarRegistro(dados) {
  const resposta = await fetch(`${BASE_URL}/registros`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return await resposta.json();
}
export async function listarRegistros() {
  const resposta = await fetch(`${BASE_URL}/registros`);
  return await resposta.json();
}
