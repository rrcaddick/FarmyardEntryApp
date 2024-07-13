import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { DrawerContentComponentProps, DrawerContentScrollView } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAppSelector } from "../hooks/useStore";

interface MenuItem {
  icon: string;
  label: string;
  screenName: string;
}

const menuItems: MenuItem[] = [
  { icon: "home", label: "Home", screenName: "Home" },
  { icon: "logout", label: "Logout", screenName: "Login" },
];

const DrawerNavigator: React.FC<DrawerContentComponentProps> = (props) => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.ownerText}>The Farmyard Park (Pty) Ltd</Text>
        <Text style={styles.subText}>{`${user?.firstName} ${user?.lastName}`}</Text>
        <Text style={styles.subText}>{user?.email}</Text>
      </View>
      <DrawerContentScrollView {...props}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={() => props.navigation.navigate(item.screenName)}
          >
            <Icon name={item.icon} size={24} color="#757575" />
            <Text style={styles.menuItemText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </DrawerContentScrollView>
      <Text style={styles.versionText}>v.2.41.1</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 16,
    paddingTop: 40,
  },
  ownerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  subText: {
    color: "white",
    fontSize: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  menuItemText: {
    marginLeft: 32,
    fontSize: 16,
    color: "#212121",
  },
  versionText: {
    padding: 16,
    color: "#757575",
  },
});

export default DrawerNavigator;
