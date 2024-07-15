import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};

export type RootTabParamList = {
  // Define your tab screens here if you have any
};

export type RootDrawerParamList = {
  // Define your drawer screens here if you have any
};

export type AppStackParamList = {
  Root: NavigatorScreenParams<RootDrawerParamList>;
  // Add other stack screens here
};
