import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Text>Open Drawer</Text>
      </TouchableOpacity>
      {/* Rest of your HomeScreen content */}
    </View>
  );
};

export default HomeScreen;
