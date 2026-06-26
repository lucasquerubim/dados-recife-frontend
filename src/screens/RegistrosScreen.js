
import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { listarRegistros } from "../services/api";

export default function RegistrosScreen() {
  const [registros, setRegistros] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  // Funcao que busca os registros no backend (GET).
  async function carregar() {
    setCarregando(true);
    setErro(false);
    try {
      const dados = await listarRegistros();
      setRegistros(dados);
    } catch (e) {
      setErro(true);
    }
    setCarregando(false);
  }

  // useFocusEffect: recarrega sempre que a tela ganha foco
  // (assim, ao salvar um registro e voltar, a lista atualiza).
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [])
  );

  if (carregando) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1565c0" />
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.centro}>
        <Text style={styles.erro}>
          Nao foi possivel carregar. Verifique se o backend esta rodando
          e se o IP em services/api.js esta correto.
        </Text>
        <TouchableOpacity style={styles.botao} onPress={carregar}>
          <Text style={styles.botaoTexto}>Tentar de novo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        Registros salvos ({registros.length})
      </Text>

      <FlatList
        data={registros}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhum registro ainda. Va em "Achar mais proximo" e salve um.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.paraciclo?.nome}</Text>
            <Text style={styles.cardSub}>
              Voce estava em: {item.latitudeUsuario.toFixed(4)},{" "}
              {item.longitudeUsuario.toFixed(4)}
            </Text>
            <Text style={styles.cardData}>
              {new Date(item.criadoEm).toLocaleString("pt-BR")}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  centro: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  titulo: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  cardTitulo: { fontSize: 16, fontWeight: "600", color: "#1565c0" },
  cardSub: { color: "#666", marginTop: 4 },
  cardData: { color: "#999", marginTop: 4, fontSize: 12 },
  vazio: { textAlign: "center", color: "#777", marginTop: 30 },
  erro: { textAlign: "center", color: "#a33", marginBottom: 16 },
  botao: { backgroundColor: "#1565c0", padding: 12, borderRadius: 8 },
  botaoTexto: { color: "#fff", fontWeight: "bold" },
});
