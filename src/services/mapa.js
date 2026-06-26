
import { Linking, Platform, Alert } from "react-native";

// Recebe latitude/longitude do destino e abre o mapa do celular.
export function abrirRotaNoMapa(latitude, longitude, rotulo = "Paraciclo") {

  const url = Platform.select({
    ios: `maps:0,0?q=${rotulo}@${latitude},${longitude}`,
    android: `geo:0,0?q=${latitude},${longitude}(${rotulo})`,
  });

  // Link universal do Google Maps (funciona como reserva, abre
  // no navegador ou no app do Google Maps se estiver instalado).
  const urlGoogle = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  // Tenta abrir o app nativo; se nao der, abre o Google Maps web.
  Linking.openURL(url).catch(() => {
    Linking.openURL(urlGoogle).catch(() => {
      Alert.alert("Erro", "Nao foi possivel abrir o mapa.");
    });
  });
}
