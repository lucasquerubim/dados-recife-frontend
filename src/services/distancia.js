
function paraRadianos(graus) {
  return (graus * Math.PI) / 180;
}

// Recebe latitude/longitude de dois pontos e retorna a
// distancia entre eles em quilometros.
export function calcularDistanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // raio da Terra em km
  const dLat = paraRadianos(lat2 - lat1);
  const dLon = paraRadianos(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(paraRadianos(lat1)) *
      Math.cos(paraRadianos(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Dada a posicao do usuario e a lista de paraciclos, retorna o
// paraciclo mais proximo, ja com a distancia calculada.
export function encontrarParaCicloMaisProximo(latUsuario, lonUsuario, paraciclos) {
  let maisProximo = null;
  let menorDistancia = Infinity;

  for (const paraciclo of paraciclos) {
    const dist = calcularDistanciaKm(
      latUsuario,
      lonUsuario,
      paraciclo.latitude,
      paraciclo.longitude
    );
    if (dist < menorDistancia) {
      menorDistancia = dist;
      maisProximo = { ...paraciclo, distanciaKm: dist };
    }
  }

  return maisProximo;
}
