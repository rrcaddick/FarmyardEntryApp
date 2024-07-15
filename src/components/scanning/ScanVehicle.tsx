import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

type ScanVehicleNavigationProp = NativeStackNavigationProp<RootStackParamList, "ScanVehicle">;

const ScanVehicle: React.FC = () => {
  const navigation = useNavigation<ScanVehicleNavigationProp>();

  const handleScanPress = () => {
    navigation.navigate("BarcodeScanner");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan a Vehicle</Text>
      <TouchableOpacity style={styles.button} onPress={handleScanPress}>
        <Text style={styles.buttonText}>Scan Barcode</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default ScanVehicle;
