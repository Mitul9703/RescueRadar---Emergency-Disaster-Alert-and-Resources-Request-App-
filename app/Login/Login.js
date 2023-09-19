// Login.js
import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here, e.g., validate user credentials
    if (username === "example" && password === "password") {
      // If login is successful, navigate to the main app screen
      navigation.navigate("Main");
    } else {
      // Display an error message or handle login failure
      alert("Invalid credentials");
    }
  };

  return (
    <View>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;
