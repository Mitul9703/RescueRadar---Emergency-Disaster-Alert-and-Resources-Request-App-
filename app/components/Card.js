import React from "react";
import { StyleSheet, View } from "react-native";

export default function Card(props) {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "column",
    marginBottom: 15,
    padding: 10,
    borderColor: "#dedede",
    borderWidth: 1,
    borderRadius: 6,
    width: "100%", // Adjust the width as needed
    shadowColor: "#333",
    elevation: 0,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  cardContent: {},
});
