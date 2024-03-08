import React, { useState } from 'react';
import { Text, View, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from './Login.style';
import Button from '../../Components/Button';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const checkLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in:', userCredential.user);
      navigation.navigate('Welcome')
    } catch (error) {
      // Handle login errors
      console.error('Login error:', error);
      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.TextContainer} >
      <Text style={styles.title}>{I18n.t('loginscreen')}</Text>
      </View>
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder={I18n.t('email')}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={I18n.t('password')}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.ButtonContainer}>
        <Button style={styles.button} title={I18n.t('login')}onPress={checkLogin} />
      </View>
    </View>
  );
};

export default Login;
