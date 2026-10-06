import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = "https://countriesnow.space/api/v0.1/countries/flag/images";
const TIEMPO = 15;

const GameContext = createContext(null);

const normalizar = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase(); //para comparar facil

const elegirAlAzar = (lista) => lista[Math.floor(Math.random() * lista.length)];

export function GameProvider({ children }) {
  const [paises, setPaises] = useState([]);
  const [paisActual, setPaisActual] = useState(null);
  const [puntaje, setPuntaje] = useState(0);
  const [jugadores, setJugadores] = useState([]);
  const [timer, setTimer] = useState(TIEMPO);
  const [pistas, setPistas] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarPaises = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        const lista = json.data;

        setPaises(lista);
        setPaisActual(elegirAlAzar(lista));
        setTimer(TIEMPO);
      } catch (err) {
        console.error("Error cargando países:", err);
        setError("No pudimos cargar los países. Revisá tu conexión.");
      } finally {
        setLoading(false);
      }
    };

    cargarPaises();
  }, []);

  const siguientePais = () => {
    setPaisActual(elegirAlAzar(paises));
    setTimer(TIEMPO);
  };


  useEffect(() => {
    if (!paisActual) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [paisActual]);


  useEffect(() => {
    if (paisActual && timer <= 0) siguientePais();
  }, [timer]);

  const adivinar = (respuesta) => {
    if (!paisActual) return false;

    if (normalizar(respuesta) === normalizar(paisActual.name)) {
      setPuntaje((p) => p + 10 + timer); 
      siguientePais();
      return true;
    }

    setPuntaje((p) => p - 1);
    return false;
  };

  const value = {
    paises,
    paisActual,
    puntaje,
    jugadores,
    timer,
    pistas,
    loading,
    error,
    setJugadores,
    setTimer,
    setPistas,
    adivinar,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame debe usarse dentro de <GameProvider>");
  return context;
};