import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Provider } from "react-redux";
import { store } from "./store/store";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DrawerNavigator from "./navigation/DrawerNavigator";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContainer: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerNavigator {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: "80%",
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Home" component={DrawerContainer} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
