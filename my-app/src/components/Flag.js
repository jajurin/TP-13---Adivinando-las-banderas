import React from "react";
import { Image } from "react-native";
import { useGame } from "./GameProvider";


//para mostar la imaguen
const aPng = (url) => {
  const limpia = url.trim();
  if (!limpia.endsWith(".svg")) return limpia;
  const archivo = limpia.split("/").pop();
  return `https://commons.wikimedia.org/wiki/Special:FilePath/${archivo}?width=640`;
};

export default function Flag() {
  const { paisActual } = useGame();

  if (!paisActual) return null;
  console.log("URL:", aPng(paisActual.flag));

  return (
    <Image
      source={{ uri: aPng(paisActual.flag) }}
      style={{ width: 280, height: 180 }}
      resizeMode="contain"
    />
  );
}