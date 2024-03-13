import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../Components/Button';

const Welcome = ({ navigation }) => {
  const removeLoginInfo = async () => {
    try {
      await AsyncStorage.removeItem('@email');
      await AsyncStorage.removeItem('@password');
      await AsyncStorage.removeItem('@hasLogin');
      navigation.navigate('SignUp');
    } catch (error) {
      console.error('Error removing login information:', error);
    }
  };
  return(
    <View>
      <Text> Welcome Screen</Text>
      <Button title={"Çıkış Yap"} onPress={removeLoginInfo}/>
    </View>
  )

}

export default Welcome;
