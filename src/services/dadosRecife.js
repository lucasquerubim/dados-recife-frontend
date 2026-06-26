
const RESOURCE_ID = "a7d63c12-f9b2-4ea0-94d3-d6093bc618fa";

const CKAN_URL =
  "https://dados.recife.pe.gov.br/api/3/action/datastore_search";

const PARACICLOS_EXEMPLO = [
  { id: 1, nome: "Marco Zero (Recife Antigo)", bairro: "Recife", endereco: "Praca do Marco Zero", latitude: -8.0631, longitude: -34.8711 },
  { id: 2, nome: "Shopping Recife", bairro: "Boa Viagem", endereco: "Rua Padre Carapuceiro", latitude: -8.1186, longitude: -34.9047 },
  { id: 3, nome: "Parque da Jaqueira", bairro: "Jaqueira", endereco: "Rua do Futuro", latitude: -8.0357, longitude: -34.9001 },
  { id: 4, nome: "Praca do Derby", bairro: "Derby", endereco: "Praca do Derby", latitude: -8.0556, longitude: -34.8956 },
  { id: 5, nome: "Pracinha de Boa Viagem", bairro: "Boa Viagem", endereco: "Av. Boa Viagem", latitude: -8.1295, longitude: -34.9007 },
  { id: 6, nome: "Shopping Guararapes", bairro: "Piedade", endereco: "Av. Barreto de Menezes (Jaboatao)", latitude: -8.1735, longitude: -34.9169 },
  { id: 7, nome: "Centro de Jaboatao", bairro: "Centro", endereco: "Jaboatao dos Guararapes", latitude: -8.1124, longitude: -35.0149 },
  { id: 8, nome: "Piedade", bairro: "Piedade", endereco: "Av. Bernardo Vieira de Melo", latitude: -8.1620, longitude: -34.9165 },
];


export async function buscarParaciclos() {
  try {
    const url = `${CKAN_URL}?resource_id=${RESOURCE_ID}&limit=100`;
    const resposta = await fetch(url);
    const json = await resposta.json();
    const registros = json?.result?.records || [];

    const paraciclos = registros
      .map((r, indice) => {
        // Trata virgula decimal e variacoes de nome de campo.
        const lat = String(r.latitude ?? r.lat ?? "").replace(",", ".");
        const lng = String(r.longitude ?? r.lng ?? r.long ?? "").replace(",", ".");
        return {
          id: r._id ?? indice,
          // "nome" usa o logradouro/endereco como titulo principal
          nome: r.logradouro || r.endereco || r.local || "Paraciclo",
          bairro: r.bairro || r.localidade || "Nao informado",
          endereco: r.logradouro || r.endereco || r.local || "Nao informado",
          latitude: Number(lat),
          longitude: Number(lng),
        };
      })
      .filter((p) => !isNaN(p.latitude) && !isNaN(p.longitude));

    return paraciclos.length ? paraciclos : PARACICLOS_EXEMPLO;
  } catch (erro) {
    console.log("Erro ao buscar API do Dados Recife:", erro);
    return PARACICLOS_EXEMPLO;
  }
}
