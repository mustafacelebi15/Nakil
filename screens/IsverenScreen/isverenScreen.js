import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./isverenScreen.style";

const isverenScreen = ({ navigation }) => {
  const [advertiser, setAdvertiser] = useState('');
  const [carrier, setCarrier] = useState('');
  const [confirmation, setConfirmation] = useState(false);
  const [from, setFrom] = useState('');
  const [price, setPrice] = useState('');
  const [where, setWhere] = useState('');
  const [ontheway, setOntheway] = useState(false);
  const [pos, setPos] = useState(0);
  
  useEffect(() => {
    getEmailAndFetchUser();
  }, []);
 
  const getEmailAndFetchUser = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('@email');
      setAdvertiser(userEmail);
      console.log(advertiser);
    } catch (error) {
      console.error('Error getting email:', error);
    }
  };

  
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

  const addAdvert = async () => {
    try {
      await firestore().collection('Nakils').add({
        advertiser,
        carrier,
        confirmation,
        from,
        ontheway,
        price,
        where,
        pos,
      });
      console.log('nakils added!');
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  return (
    <View style={styles.container}>
       <ImageBackground style={styles.imageBackground} source={require('../../Assets/splashscrn.png')} >
       <View style={styles.ButtonContainer}>
      <Button title="Oluşturulan Teklifler" onPress={() => navigation.navigate('TasOffers')} />
      <Button title="Çıkış Yap" onPress={removeLoginInfo} />
      </View>
      <View style={styles.contentContainer}>
      <TextInput style={styles.input}
        placeholder="From"
        value={from}
        onChangeText={text => setFrom(text)}
      />
      <TextInput style={styles.input}
        placeholder="Where"
        value={where}
        onChangeText={text => setWhere(text)}
      />
      <TextInput style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={text => setPrice(text)}
      />
      </View>
      <View style={styles.ButtonContainer}>
      <Button title={"İlan oluştur."} onPress={addAdvert}/>
      <Button title={"Çıkış Yap"} onPress={removeLoginInfo}/>
      <Button title={"Onay Bekleyenler"} onPress={() => navigation.navigate('IsOffers')}/>
      </View>
      </ImageBackground>
    </View>
  );
}

export default isverenScreen;
