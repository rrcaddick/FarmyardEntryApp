import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Login">;

const { width, height } = Dimensions.get("window");

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const { login, isLoading, error } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    const success = await login({ username, password });
    if (success) {
      navigation.navigate("Home");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topRightShape}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,5 L0,0 L100,0 L100,100 C30,60 100,10 -10,10 Z" fill="#3b5998" fillOpacity="0.1" />
        </Svg>
      </View>
      <View style={styles.topRightShape}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,0 L100,0 L100,75 C30,75 0,-10 0,5 Z" fill="#19387a" fillOpacity="0.1" />
        </Svg>
      </View>
      <View style={styles.bottomLeftShape}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,100 L100,100 C30,60 50,10 -30,0 Z" fill="#ff8c00" fillOpacity="0.1" />
        </Svg>
      </View>
      <View style={styles.bottomLeftShape}>
        <Svg height="100%" width="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <Path d="M0,100 L100,100, L100,60 C0,150 0,10 0,75 Z" fill="#ed590f" fillOpacity="0.1" />
        </Svg>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>LOGIN</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="example@email.com" value="emilys" onChangeText={setUsername} />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            // value={password}
            value="emilyspass"
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={styles.loginButtonText}>LOGIN</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 6,
  },
  topRightShape: {
    position: "absolute",
    top: 0,
    right: 0,
    width: width,
    height: height / 3,
  },
  bottomLeftShape: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: width,
    height: height / 3,
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  loginText: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  forgotPassword: {
    color: "#3b5998",
    textAlign: "right",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#ff8c00",
    padding: 15,
    borderRadius: 60,
    alignItems: "center",
    paddingHorizontal: 70,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 10,
    textAlign: "center",
    color: "#04112b",
    fontSize: 10,
  },
  loginButtonContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
  },
});

export default LoginScreen;
