import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import { colors } from "../../styles/colors";

interface OptionsMenuProps {
  visible: boolean;
  onClose: () => void;
}

const OptionsMenu: React.FC<OptionsMenuProps> = ({ visible, onClose }) => (
  <Modal visible={visible} transparent={true} animationType="fade" onRequestClose={onClose}>
    <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
      <View style={styles.optionsMenu}>
        <TouchableOpacity style={styles.optionItem}>
          <Text>Option 1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>Option 2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Text>Option 3</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  </Modal>
);

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  optionsMenu: {
    backgroundColor: colors.white,
    borderRadius: 4,
    marginTop: 56,
    marginRight: 16,
    width: 200,
  },
  optionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
});

export default OptionsMenu;
