
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";

import { buscarParaciclos } from "../services/dadosRecife";
import { encontrarParaCicloMaisProximo } from "../services/distancia";
import { salvarRegistro } from "../services/api";
import { abrirRotaNoMapa } from "../services/mapa";

export default function LocalizacaoScreen({ navigation }) {
  const [carregando, setCarregando] = useState(false);
  const [local, setLocal] = useState(null);       // posicao do usuario
  const [paraciclo, setParaciclo] = useState(null); // paraciclo mais proximo
  const [salvando, setSalvando] = useState(false);

  // Funcao principal: pede permissao, pega o GPS e calcula o paraciclo.
  async function pegarLocalizacao() {
    setCarregando(true);
    setParaciclo(null);

    // 1. Pede permissao de localizacao ao usuario.
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissao negada", "Precisamos da sua localizacao.");
      setCarregando(false);
      return;
    }

    // 2. Obtem as coordenadas atuais do dispositivo.
    const posicao = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = posicao.coords;
    setLocal({ latitude, longitude });

    // 3. Busca os paraciclos e calcula o mais proximo.
    const paraciclos = await buscarParaciclos();
    const maisProximo = encontrarParaCicloMaisProximo(
      latitude,
      longitude,
      paraciclos
    );
    setParaciclo(maisProximo);

    setCarregando(false);
  }

  // Salva o registro (localizacao + paraciclo) no backend via POST.
  async function salvarNoBackend() {
    if (!local || !paraciclo) return;
    setSalvando(true);
    try {
      await salvarRegistro({
        latitudeUsuario: local.latitude,
        longitudeUsuario: local.longitude,
        paraciclo: paraciclo,
      });
      Alert.alert("Sucesso", "Registro salvo no backend!");
      navigation.navigate("Registros"); // leva para a tela de registros
    } catch (erro) {
      Alert.alert(
        "Erro",
        "Nao foi possivel salvar. O backend esta rodando e o IP esta certo?"
      );
    }
    setSalvando(false);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={pegarLocalizacao}>
        <Text style={styles.botaoTexto}>Pegar minha localizacao</Text>
      </TouchableOpacity>

      {carregando && (
        <ActivityIndicator
          size="large"
          color="#1565c0"
          style={{ marginTop: 20 }}
        />
      )}

      {/* Mostra a localizacao do usuario */}
      {local && (
        <View style={styles.card}>
          <Text style={styles.label}>Sua localizacao:</Text>
          <Text style={styles.valor}>
            {local.latitude.toFixed(5)}, {local.longitude.toFixed(5)}
          </Text>
        </View>
      )}

      {/* Mostra o paraciclo mais proximo */}
      {paraciclo && (
        <View style={[styles.card, styles.cardDestaque]}>
          <Text style={styles.label}>Paraciclo mais proximo:</Text>
          <Text style={styles.paracicloNome}>{paraciclo.nome}</Text>
          <Text style={styles.valor}>
            A {paraciclo.distanciaKm.toFixed(2)} km de voce
          </Text>

          {/* Botao que abre o mapa do celular tracando a rota */}
          <TouchableOpacity
            style={styles.botaoRota}
            onPress={() =>
              abrirRotaNoMapa(
                paraciclo.latitude,
                paraciclo.longitude,
                paraciclo.nome
              )
            }
          >
            <Text style={styles.botaoTexto}>🗺️  Tracar rota no Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={salvarNoBackend}
            disabled={salvando}
          >
            <Text style={styles.botaoTexto}>
              {salvando ? "Salvando..." : "Salvar no backend"}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  botao: {
    backgroundColor: "#1565c0",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  botaoRota: {
    backgroundColor: "#2e7d32",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  botaoSalvar: {
    backgroundColor: "#1565c0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 12,
  },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
    elevation: 2,
  },
  cardDestaque: { borderLeftWidth: 5, borderLeftColor: "#1565c0" },
  label: { color: "#666", fontSize: 13 },
  valor: { fontSize: 16, color: "#222", marginTop: 4 },
  paracicloNome: { fontSize: 18, fontWeight: "bold", color: "#1565c0", marginTop: 4 },
});
