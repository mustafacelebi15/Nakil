import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./Welcome.style";

const Welcome = ({ navigation }) => {
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [TcId, setTcId] = useState('');
  const [isTasiyici, setIsTasiyici] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    getEmailAndFetchUser();
  }, []);
 
  const getEmailAndFetchUser = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('@email');
      setEmail(userEmail);
      console.log(email);
      fetchUserByEmail(userEmail);
    } catch (error) {
      console.error('Error getting email:', error);
    }
  };
  const fetchUserByEmail = async (email) => {
    try {
      const userRef = firestore().collection('Users').where('email', '==', email);
      const snapshot = await userRef.get();
  
      if (snapshot.empty) {
        console.log('Kullanıcı bulunamadı');
        return;
      }
  
      snapshot.forEach(doc => {
        const userData = doc.data();
        console.log('User:', userData.isTasiyici);
        
        if(userData.isTasiyici){
          navigation.navigate('TasHome');
        }
        else{
          navigation.navigate('IsHome');
        }
      });
    } catch (error) {
      console.error('Error fetching user by email:', error);
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

  const addUser = async () => {
    try {
      await firestore().collection('Users').add({
        Name,
        Surname,
        PhoneNumber,
        TcId,
        isTasiyici,
        email,
      });
      console.log('User added!');
      if (isTasiyici){
        navigation.navigate('TasHome');
      }
      else{
        navigation.navigate('IsHome');
      }
    } catch (error) {
      console.error('Error adding user: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
      <TextInput style={styles.input}
        placeholder="Name"
        value={Name}
        onChangeText={text => setName(text)}
      />
      <TextInput style={styles.input}
        placeholder="Surname"
        value={Surname}
        onChangeText={text => setSurname(text)}
      />
      <TextInput style={styles.input}
        placeholder="Phone Number"
        value={PhoneNumber}
        onChangeText={text => setPhoneNumber(text)}
      />
      <TextInput style={styles.input}
        placeholder="Identity Number"
        value={TcId}
        onChangeText={text => setTcId(text)}
      />
      <View style={styles.ButtonContainer}>
      <Button title={"Taşıyıcı olmak istiyorum"} onPress={() => setIsTasiyici(true)}/>
      <Button title={"İşveren olmak istiyorum"} onPress={() => setIsTasiyici(false)}/>
      <Button title={"Kayıt ol"} onPress={addUser}/>
      <Button title={"Çıkış Yap"} onPress={removeLoginInfo}/>
      </View>
      </View>
    </View>
  );
}

export default Welcome;
