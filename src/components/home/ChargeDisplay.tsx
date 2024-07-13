import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

interface ChargeDisplayProps {
  charge: number;
}

const ChargeDisplay: React.FC<ChargeDisplayProps> = ({ charge }) => (
  <View style={styles.chargeDisplay}>
    <Text style={styles.chargeText}>CHARGE</Text>
    <Text style={styles.chargeAmount}>{charge.toFixed(2)}</Text>
  </View>
);

const styles = StyleSheet.create({
  chargeDisplay: {
    backgroundColor: colors.secondary,
    padding: 16,
    alignItems: "center",
    margin: 16,
  },
  chargeText: {
    color: colors.white,
    fontSize: 18,
  },
  chargeAmount: {
    color: colors.white,
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default ChargeDisplay;
