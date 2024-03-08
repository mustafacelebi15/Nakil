import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, Linking} from 'react-native';  // Alert ekleniyor
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';

import Button from '../../Components/Button';
import styles from "./SignUp.style";

const Anasayfa = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const checkInternetConnection = async () => {
        const netInfoState = await NetInfo.fetch();
        setIsConnected(netInfoState.isConnected);
      };

      await checkInternetConnection();

      setTimeout(() => {
        if (isConnected === true) {
          console.log(isConnected);
          SplashScreen.hide();
        } else if(isConnected === false){
          console.log('Bağlantı:', isConnected);
          showNoInternetAlert();
        }
      }, 2000);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    fetchData();

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const openSettings = () => {
    Linking.openSettings();
  };

  const showNoInternetAlert = () => {
    Alert.alert(
      'Bağlantı Hatası',
      'İnternet bağlantınızı kontrol etmek için ayarlara gidin',
      [
        {
          text: 'Tamam',
          onPress: openSettings,
        },
      ]
    );
  };

  const createAccount = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <View style={styles.TextContainer}>
          <Text style={styles.title}>Hesap Oluştur</Text>
          </View>
          <TextInput style={styles.input} placeholder="E-mail adresinizi giriniz." value={email} onChangeText={(text) => setEmail(text)} />
          <TextInput style={styles.input} placeholder="Şifrenizi giriniz." value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
          <View style={styles.ButtonContainer}>
            <Button title="Sign Up" onPress={createAccount}/>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Anasayfa;
