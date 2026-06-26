
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

import { abrirRotaNoMapa } from "../services/mapa";

export default function DetalheScreen({ route }) {
  // Pega o paraciclo que foi passado na navegacao.
  const { paraciclo } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Cabecalho com icone de bike */}
      <View style={styles.header}>
        <Text style={styles.icone}>🚲</Text>
        <Text style={styles.titulo}>{paraciclo.nome}</Text>
      </View>

      {/* Bloco de informacoes */}
      <View style={styles.card}>
        <Text style={styles.label}>Endereco</Text>
        <Text style={styles.valor}>{paraciclo.endereco}</Text>

        <Text style={styles.label}>Bairro</Text>
        <Text style={styles.valor}>{paraciclo.bairro}</Text>

        <Text style={styles.label}>Coordenadas</Text>
        <Text style={styles.valor}>
          {paraciclo.latitude.toFixed(5)}, {paraciclo.longitude.toFixed(5)}
        </Text>

        {/* Se a tela anterior calculou a distancia, mostramos */}
        {paraciclo.distanciaKm != null && (
          <>
            <Text style={styles.label}>Distancia ate voce</Text>
            <Text style={styles.valor}>
              {paraciclo.distanciaKm.toFixed(2)} km
            </Text>
          </>
        )}
      </View>

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
        <Text style={styles.botaoRotaTexto}>🗺️  Tracar rota no Maps</Text>
      </TouchableOpacity>

      <Text style={styles.dica}>
        Ao tocar no botao, abre o app de mapas do seu celular (Google Maps
        ou Apple Maps) com a localizacao deste paraciclo.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  header: { alignItems: "center", marginVertical: 16 },
  icone: { fontSize: 48 },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1565c0",
    textAlign: "center",
    marginTop: 8,
  },
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    elevation: 2,
  },
  label: { color: "#888", fontSize: 13, marginTop: 14 },
  valor: { fontSize: 16, color: "#222", marginTop: 2 },
  botaoRota: {
    backgroundColor: "#1565c0",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  botaoRotaTexto: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  dica: {
    color: "#888",
    fontSize: 13,
    textAlign: "center",
    marginTop: 14,
    marginBottom: 30,
  },
});
