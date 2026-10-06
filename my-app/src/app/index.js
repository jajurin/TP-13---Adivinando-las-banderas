import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { GameProvider, useGame } from "../components/GameProvider";
import Flag from "../components/Flag";
import GuessForm from "../components/GuessForm";
import ScoreBoard from "../components/ScoreBoard";
import Timer from "../components/Timer";
function Juego() {
  const { paisActual, loading, error } = useGame();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Adiviná la bandera</Text>
      <ScoreBoard />

      {loading && <ActivityIndicator size="large" />}
      {error && <Text style={styles.error}>{error}</Text>}

      {paisActual && (
        <View style={styles.centro}>
          <Flag />
          <GuessForm />
        </View>
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <GameProvider>
     <ScoreBoard />
      <Timer />
      <Juego />
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f1f0f1" },
  titulo: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginTop: 20 },
  centro: { alignItems: "center", gap: 16, marginTop: 20 },
  error: { color: "red", textAlign: "center" },
});