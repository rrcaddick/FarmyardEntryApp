import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";
import { Header, ChargeDisplay, ItemSelector, ShiftStatus, OptionsMenu } from "../components";
import { colors } from "../styles/colors";
import { DrawerNavigationProp } from "@react-navigation/drawer";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [charge, setCharge] = useState(0);
  const [shiftOpen, setShiftOpen] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const toggleShift = () => {
    setShiftOpen(!shiftOpen);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <ChargeDisplay charge={charge} />
      <ItemSelector />
      <ShiftStatus isOpen={shiftOpen} onToggleShift={toggleShift} />
      <OptionsMenu visible={optionsVisible} onClose={() => setOptionsVisible(false)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default HomeScreen;
