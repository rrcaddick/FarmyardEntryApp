import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../styles/colors";

interface ShiftStatusProps {
  onOpenShift: () => void;
}

const ShiftStatus: React.FC<ShiftStatusProps> = ({ onOpenShift }) => {
  return (
    <View style={styles.shiftStatus}>
      <Icon name="access-time" size={48} color={colors.gray} />
      <Text style={styles.shiftStatusText}>Shift is closed</Text>
      <Text style={styles.shiftStatusSubtext}>Open a shift to perform sales</Text>
      <TouchableOpacity style={styles.shiftButton} onPress={onOpenShift}>
        <Text style={styles.shiftButtonText}>OPEN SHIFT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shiftStatus: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  shiftStatusText: {
    fontSize: 18,
    marginTop: 16,
  },
  shiftStatusSubtext: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
  },
  shiftButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    marginTop: 16,
  },
  shiftButtonText: {
    color: colors.white,
    fontWeight: "bold",
  },
});

export default ShiftStatus;
