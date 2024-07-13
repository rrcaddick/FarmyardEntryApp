import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../styles/colors";

const ItemSelector: React.FC = () => (
  <View style={styles.itemSelector}>
    <View style={styles.itemSelectorLeft}>
      <Text style={styles.itemSelectorText}>All items</Text>
      <Icon name="arrow-drop-down" size={24} color={colors.black} />
    </View>
    <Icon name="search" size={24} color={colors.black} />
  </View>
);

const styles = StyleSheet.create({
  itemSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
    padding: 16,
    margin: 16,
  },
  itemSelectorLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemSelectorText: {
    fontSize: 16,
    marginRight: 8,
  },
});

export default ItemSelector;
