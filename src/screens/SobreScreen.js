
import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titulo}>O que e um paraciclo?</Text>
      <Text style={styles.paragrafo}>
        Paraciclo e um mobiliario urbano publico feito para estacionar e
        prender bicicletas com seguranca, por curta ou media duracao. Sao
        aquelas estruturas de metal (em formato de "U" invertido, por exemplo)
        instaladas em calcadas, pracas, escolas e pontos de comercio, onde voce
        prende a bike com um cadeado.
      </Text>

      <Text style={styles.subtitulo}>Como funciona?</Text>
      <Text style={styles.paragrafo}>
        Voce encosta a bicicleta na estrutura e prende o quadro e a roda com um
        cadeado ou corrente. Por ficarem em locais de uso publico e movimentados,
        os paraciclos ajudam a reduzir o risco de furto e mantem as calcadas
        organizadas, sem bikes presas em postes ou arvores.
      </Text>

      <Text style={styles.subtitulo}>Para que serve?</Text>
      <Text style={styles.paragrafo}>
        Serve para incentivar o uso da bicicleta como meio de transporte. Quem
        pedala precisa de um lugar seguro para deixar a bike ao chegar no
        destino (trabalho, faculdade, mercado). Sem isso, muita gente desiste de
        usar a bicicleta no dia a dia.
      </Text>

      <Text style={styles.subtitulo}>Paraciclo x Bicicletario</Text>
      <Text style={styles.paragrafo}>
        Sao parecidos, mas diferentes. O paraciclo fica na via publica, e de
        acesso livre e nao tem controle de entrada. Ja o bicicletario costuma
        ser um espaco fechado, com controle de acesso e mais seguranca, indicado
        para deixar a bike por mais tempo.
      </Text>

      <View style={styles.destaque}>
        <Text style={styles.destaqueTitulo}>Por que este app existe?</Text>
        <Text style={styles.destaqueTexto}>
          Quem anda de bike na cidade tem o problema de nao saber onde deixar a
          bicicleta com seguranca. Este app usa a sua localizacao para mostrar o
          paraciclo mais proximo de voce, com base nos dados abertos da CTTU
          (Dados Recife). Assim, fica mais facil planejar o trajeto e estacionar
          a bike num ponto oficial.
        </Text>
      </View>

      <Text style={styles.fonte}>
        Fonte dos dados: Portal de Dados Abertos do Recife (CTTU) -
        conjunto "Paraciclos do Recife".
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  titulo: { fontSize: 22, fontWeight: "bold", color: "#1565c0", marginBottom: 12 },
  subtitulo: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#222",
    marginTop: 18,
    marginBottom: 6,
  },
  paragrafo: { fontSize: 15, color: "#444", lineHeight: 22 },
  destaque: {
    backgroundColor: "#e3f2fd",
    padding: 16,
    borderRadius: 10,
    marginTop: 22,
    borderLeftWidth: 5,
    borderLeftColor: "#1565c0",
  },
  destaqueTitulo: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1565c0",
    marginBottom: 6,
  },
  destaqueTexto: { fontSize: 15, color: "#333", lineHeight: 22 },
  fonte: {
    fontSize: 12,
    color: "#888",
    marginTop: 20,
    marginBottom: 30,
    fontStyle: "italic",
  },
});
