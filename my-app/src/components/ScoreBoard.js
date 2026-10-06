import React from "react";
import { Text, StyleSheet } from "react-native";
import { useGame } from "./GameContext";

export default function ScoreBoard() {
  const { puntaje } = useGame();

  return <Text style={styles.puntaje}>Puntaje: {puntaje}</Text>;
}

const styles = StyleSheet.create({
  puntaje: { fontSize: 20, textAlign: "center", marginVertical: 10 },
});