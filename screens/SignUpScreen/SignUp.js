import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, Linking, ImageBackground} from 'react-native';  // Alert ekleniyor
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../Components/Button';
import styles from "./SignUp.style";
import I18n from '../../android/app/src/lang/_i18n';

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

  const createAccount = async () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(res => console.log(res))
      .catch(err => console.log(err));
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@password', password);
      await AsyncStorage.setItem('@hasLogin', 'false');
      navigation.navigate('Login');
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const username = await AsyncStorage.getItem('@email');
        const password = await AsyncStorage.getItem('@password');
        const hasLogin = await AsyncStorage.getItem('@hasLogin');
        if (username && password && hasLogin === 'true') {
          navigation.navigate('Welcome');
        }else if (username && password && hasLogin === 'false'){
          navigation.navigate('Login');
        }
        else{
          navigation.navigate('SignUp');
        }
      } catch (error) {
        console.error('Error checking login information:', error);
      }
    };

    checkLogin();
  }, [navigation]);
  

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={require('../../Assets/harita.jpg')} >
      <SafeAreaView>
        <View style={styles.contentContainer}>
          <View style={styles.TextContainer}>
          <Text style={styles.title}>{I18n.t('create')}</Text>
          </View>
          <TextInput style={styles.input} placeholder={I18n.t('email')} value={email} onChangeText={(text) => setEmail(text)} />
          <TextInput style={styles.input} placeholder={I18n.t('password')} value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
          <View style={styles.ButtonContainer}>
            <Button title={I18n.t('signup')} onPress={createAccount}/>
            <Button title="Zaten hesabın var mı?" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </SafeAreaView>
      </ImageBackground>
    </View>
   
  );
};

export default Anasayfa;
