import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ResenaCliente() {
  const router = useRouter();
  const { id, category } = useLocalSearchParams();

  if (typeof id !== "string" || typeof category !== "string") {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>
          Parámetros inválidos: se requiere un "id" de restaurante y un tipo de
          "plato".
        </Text>
      </View>
    );
  }

  const tipoPlato = category.toLowerCase();
  const esBebida = tipoPlato === "bebidas";

  const preguntasTest = esBebida
    ? [
        "¿Cómo calificas el sabor de la bebida?",
        "¿La temperatura de la bebida fue adecuada?",
        "¿Cómo calificas la presentación de la bebida?",
        "¿La cantidad de la bebida fue adecuada?",
        "¿Recomendarías esta bebida a otros?",
      ]
    : [
        "¿Cómo calificas el sabor del plato?",
        "¿Cómo calificas la presentación del plato?",
        "¿La temperatura de la comida fue adecuada?",
        "¿La textura y cocción fueron de tu agrado?",
        "¿Recomendarías este plato a otros?",
      ];

  const preguntasAbiertas = esBebida
    ? [
        "¿Qué es lo que más te gustó de la bebida?",
        "¿Qué se podría mejorar en la bebida?",
        "¿La bebida cumplió tus expectativas? ¿Por qué?",
        "Comentarios sobre la presentación o servicio de la bebida:",
        "Comentarios adicionales:",
      ]
    : [
        "¿Qué es lo que más te gustó del plato?",
        "¿Encontraste algo que se podría mejorar en el plato?",
        "¿El plato cumplió con tus expectativas? ¿Por qué?",
        "Comentarios sobre la presentación o apariencia:",
        "Comentarios adicionales:",
      ];

  const [respuestasTest, setRespuestasTest] = useState<number[]>(
    Array(preguntasTest.length).fill(0)
  );
  const [respuestasAbiertas, setRespuestasAbiertas] = useState<string[]>(
    Array(preguntasAbiertas.length).fill("")
  );

  const handleSelectRating = (questionIndex: number, value: number) => {
    const nuevasRespuestas = [...respuestasTest];
    nuevasRespuestas[questionIndex] = value;
    setRespuestasTest(nuevasRespuestas);
  };

  const handleChangeTexto = (questionIndex: number, text: string) => {
    const nuevosTextos = [...respuestasAbiertas];
    nuevosTextos[questionIndex] = text;
    setRespuestasAbiertas(nuevosTextos);
  };

  const allTestAnswered = respuestasTest.every((val) => val > 0);

  const enviarResena = async () => {
    const userId = await AsyncStorage.getItem("userId");
    if (!userId) {
      Alert.alert(
        "Error",
        "No se encontró el usuario. Por favor, vuelve a iniciar sesión."
      );
      return;
    }
    console.log("ID del usuario:", userId);
    console.log("ID del plato:", id);
    const body = {
      id_usuario: Number(userId),
      id_plato: Number(id),
      p1_satisfaccion: Number(respuestasTest[0]),
      p2_satisfaccion: Number(respuestasTest[1]),
      p3_satisfaccion: Number(respuestasTest[2]),
      p4_satisfaccion: Number(respuestasTest[3]),
      p5_satisfaccion: Number(respuestasTest[4]),
      p1_texto: respuestasAbiertas[0],
      p2_texto: respuestasAbiertas[1],
      p3_texto: respuestasAbiertas[2],
      p4_texto: respuestasAbiertas[3],
      p5_texto: respuestasAbiertas[4],
    };
    console.log(body);

    try {
      const response = await fetch(
        process.env.EXPO_PUBLIC_BACKEND_NODEJS + "/resenas",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error("Error al enviar la reseña: " + errorText);
      }

      Alert.alert("¡Reseña enviada!", "Gracias por tu reseña.", [
        {
          text: "Aceptar",
          onPress: () => router.push(`/cliente/restaurantes/${id}`),
        },
      ]);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "No se pudo enviar la reseña. Intenta de nuevo."
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => router.replace("../")}
        style={styles.backButton}
      >
        <ArrowLeft size={30} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>
        Reseña del {esBebida ? "Bebida" : "Plato"}
      </Text>

      {preguntasTest.map((pregunta, index) => (
        <View key={`test-${index}`} style={styles.questionContainer}>
          <Text style={styles.questionText}>{pregunta}</Text>
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((num) => (
              <Pressable
                key={num}
                onPress={() => handleSelectRating(index, num)}
                style={[
                  styles.ratingOption,
                  respuestasTest[index] === num && styles.ratingOptionSelected,
                ]}
              >
                <Text
                  style={[
                    styles.ratingText,
                    respuestasTest[index] === num && styles.ratingTextSelected,
                  ]}
                >
                  {num}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}

      {preguntasAbiertas.map((pregunta, index) => (
        <View key={`abierta-${index}`} style={styles.questionContainer}>
          <Text style={styles.questionText}>{pregunta}</Text>
          <TextInput
            style={styles.textInput}
            multiline
            placeholder="Escribe tu respuesta aquí..."
            value={respuestasAbiertas[index]}
            onChangeText={(text) => handleChangeTexto(index, text)}
          />
        </View>
      ))}

      <Pressable
        style={[
          styles.submitButton,
          !allTestAnswered && styles.submitButtonDisabled,
        ]}
        onPress={enviarResena}
        disabled={!allTestAnswered}
      >
        <Text style={styles.submitButtonText}>Enviar reseña</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  ratingOption: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: "#f9f9f9",
  },
  ratingOptionSelected: {
    backgroundColor: "#4caf50",
    borderColor: "#4caf50",
  },
  ratingText: {
    fontSize: 16,
    color: "#333",
  },
  ratingTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    fontSize: 15,
    textAlignVertical: "top",
    minHeight: 60,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 30,
  },
  submitButtonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 25,
    zIndex: 1,
    backgroundColor: "#f7e6c3",
    padding: 8,
    borderWidth: 1,
    borderColor: "#ffffff",
    borderRadius: 10,
  },
});
