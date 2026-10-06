import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useGame } from "./GameContext";

export default function GuessForm() {
  const { adivinar } = useGame();
  const [mensaje, setMensaje] = useState("");

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { respuesta: "" },
  });

  const enviar = ({ respuesta }) => {
    const acierto = adivinar(respuesta);
    setMensaje(acierto ? "¡Correcto! +10" : "Incorrecto -1");
    reset();
  };

  return (
    <View style={styles.contenedor}>
      <Controller
        control={control}
        name="respuesta"
        rules={{ validate: (valor) => valor.trim().length > 0 || "Escribí un país" }}
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            placeholder="¿De qué país es?"
            value={value}
            onChangeText={onChange}
            onSubmitEditing={handleSubmit(enviar)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        )}
      />

      {errors.respuesta && <Text style={styles.error}>{errors.respuesta.message}</Text>}

      <TouchableOpacity style={styles.boton} onPress={handleSubmit(enviar)}>
        <Text style={styles.botonTexto}>Responder</Text>
      </TouchableOpacity>

      {!!mensaje && <Text style={styles.mensaje}>{mensaje}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { width: "100%", alignItems: "center", gap: 16 },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  boton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  botonTexto: { color: "#fff", fontSize: 16, fontWeight: "600" },
  mensaje: { fontSize: 18 },
  error: { color: "red", textAlign: "center" },
});