import React from "react";
import { StyleSheet, SafeAreaView, View } from "react-native";
import { Header, ChargeDisplay, ItemSelector, ShiftStatus, OptionsMenu } from "../components";
import { colors } from "../styles/colors";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useAppSelector, useAppDispatch } from "../hooks/useStore";
import { openShift } from "../store/slices/shiftSlice";

type HomeScreenProps = {
  navigation: DrawerNavigationProp<any>;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const currentShift = useAppSelector((state) => state.shift.currentShift);
  const user = useAppSelector((state) => state.auth.user);

  const handleOpenShift = () => {
    dispatch(
      openShift({
        userId: user?.id || 0,
        startTime: new Date().toISOString(),
      })
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      {currentShift ? (
        <View>
          <ChargeDisplay charge={0} />
          <ItemSelector />
        </View>
      ) : (
        <ShiftStatus onOpenShift={handleOpenShift} />
      )}
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
