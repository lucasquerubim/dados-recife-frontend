
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";

import { buscarParaciclos } from "../services/dadosRecife";

export default function HomeScreen({ navigation }) {
  const [paraciclos, setParaciclos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // useEffect roda assim que a tela abre: busca os dados da API.
  useEffect(() => {
    async function carregar() {
      const dados = await buscarParaciclos();
      setParaciclos(dados);
      setCarregando(false);
    }
    carregar();
  }, []);

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1565c0" />
        <Text style={styles.textoCarregando}>Carregando paraciclos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Botoes de navegacao para as outras telas */}
      <View style={styles.botoes}>
        <TouchableOpacity
          style={styles.botao}
          onPress={() => navigation.navigate("Localizacao")}
        >
          <Text style={styles.botaoTexto}>📍  Achar mais proximo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, styles.botaoSecundario]}
          onPress={() => navigation.navigate("Registros")}
        >
          <Text style={styles.botaoTexto}>📋  Registros</Text>
        </TouchableOpacity>
      </View>

      {/* Botao para a tela explicativa (so front, sem API) */}
      <TouchableOpacity
        style={styles.botaoSobre}
        onPress={() => navigation.navigate("Sobre")}
      >
        <Text style={styles.botaoSobreTexto}>ℹ️  O que e um paraciclo?</Text>
      </TouchableOpacity>

      <Text style={styles.titulo}>
        Paraciclos no Recife ({paraciclos.length})
      </Text>
      <Text style={styles.subtitulo}>Toque em um para ver detalhes e rota</Text>

      <FlatList
        data={paraciclos}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          // TouchableOpacity: o card inteiro vira um botao.
          // Ao tocar, navega para Detalhe levando o paraciclo.
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.7}
            onPress={() => navigation.navigate("Detalhe", { paraciclo: item })}
          >
            <View style={styles.cardIcone}>
              <Text style={styles.cardEmoji}>🚲</Text>
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo} numberOfLines={2}>
                {item.nome}
              </Text>
              <Text style={styles.cardBairro}>{item.bairro}</Text>
            </View>
            <Text style={styles.cardSeta}>›</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#eef1f5" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center" },
  textoCarregando: { marginTop: 10, color: "#555" },
  botoes: { flexDirection: "row", gap: 10, marginBottom: 10 },
  botao: {
    flex: 1,
    backgroundColor: "#1565c0",
    padding: 13,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoSecundario: { backgroundColor: "#37474f" },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
  botaoSobre: {
    backgroundColor: "#e3f2fd",
    padding: 11,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 18,
  },
  botaoSobreTexto: { color: "#1565c0", fontWeight: "600" },
  titulo: { fontSize: 19, fontWeight: "bold", color: "#1a1a1a" },
  subtitulo: { fontSize: 13, color: "#777", marginBottom: 12, marginTop: 2 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardIcone: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#e3f2fd",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardEmoji: { fontSize: 22 },
  cardInfo: { flex: 1 },
  cardTitulo: { fontSize: 15, fontWeight: "600", color: "#222" },
  cardBairro: { color: "#1565c0", marginTop: 3, fontSize: 13, fontWeight: "500" },
  cardSeta: { fontSize: 26, color: "#bbb", marginLeft: 8 },
});
