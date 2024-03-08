import React,{useState} from "react";
import { Text, SafeAreaView, View, TextInput, Alert, TouchableOpacity} from "react-native";

import styles from "./SignUp.style";
import Button from "../../Components/Button";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup  Screen</Text>
      <View style={styles.contentContainer}>
      <TextInput style={styles.input} placeholder="Adınızı giriniz" value={username} onChangeText={(text) => setUsername(text)} />
      <TextInput style={styles.input} placeholder="Şifrenizi giriniz" value={password} onChangeText={(text) => setPassword(text)} />
      </View>
      <View style={styles.ButtonContainer}>
      <Button style={styles.button}
        title="Kayıt ol"
      />
      </View>
    </View>
  );
};

export default SignUp;
