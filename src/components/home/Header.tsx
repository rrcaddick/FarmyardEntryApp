import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { colors } from "../../styles/colors";

interface HeaderProps {
  navigation: DrawerNavigationProp<any>;
}

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Icon name="menu" size={24} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.headerCenter}>
        <Text style={styles.headerTitle}>Ticket</Text>
        <Icon name="local-activity" size={24} color={colors.white} />
      </View>
      <View style={styles.headerRight}>
        <Icon name="person" size={24} color={colors.white} style={styles.headerIcon} />
        <TouchableOpacity onPress={() => {}}>
          <Icon name="more-vert" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
  },
  headerCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
  },
  headerRight: {
    flexDirection: "row",
  },
  headerIcon: {
    marginRight: 16,
  },
});

export default Header;
