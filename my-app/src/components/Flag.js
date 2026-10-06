import React from "react";
import { Image } from "react-native";
import { SvgUri } from "react-native-svg";
import { useGame } from "./GameContext";

export default function Flag() {
  const { paisActual } = useGame();

  if (!paisActual) return null;

  const uri = paisActual.flag;
//esto de abajo para pasarlo a imaguen por que es url.
  if (uri.toLowerCase().endsWith(".svg")) {
    return <SvgUri uri={uri} width={280} height={180} />; 
  }
  return (
    <Image source={{ uri }} style={{ width: 280, height: 180 }} resizeMode="contain" />
  );
}