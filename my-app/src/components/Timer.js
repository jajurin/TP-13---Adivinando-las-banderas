import React from "react";
import { Text, StyleSheet } from "react-native";
import { useGame } from "./GameProvider"; 

export default function Timer() {
  const { timer } = useGame();

  return <Text style={[styles.timer, timer <= 5 && styles.urgente]}>⏱ {timer}s</Text>;
}

const styles = StyleSheet.create({
  timer: { fontSize: 22, fontWeight: "bold", textAlign: "center" },
  urgente: { color: "red" },
});