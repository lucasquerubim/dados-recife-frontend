
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import HomeScreen from "./src/screens/HomeScreen";
import LocalizacaoScreen from "./src/screens/LocalizacaoScreen";
import RegistrosScreen from "./src/screens/RegistrosScreen";
import SobreScreen from "./src/screens/SobreScreen";
import DetalheScreen from "./src/screens/DetalheScreen";

// Cria a "pilha" de navegacao (uma tela empilha sobre a outra)
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: "#1565c0" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Paraciclos - Recife" }}
        />
        <Stack.Screen
          name="Localizacao"
          component={LocalizacaoScreen}
          options={{ title: "Paraciclo mais proximo" }}
        />
        <Stack.Screen
          name="Registros"
          component={RegistrosScreen}
          options={{ title: "Registros Salvos" }}
        />
        <Stack.Screen
          name="Sobre"
          component={SobreScreen}
          options={{ title: "Sobre os Paraciclos" }}
        />
        <Stack.Screen
          name="Detalhe"
          component={DetalheScreen}
          options={{ title: "Detalhes do Paraciclo" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
