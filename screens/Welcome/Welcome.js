import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./Welcome.style";

const Welcome = ({ navigation }) => {
  useEffect(() => {
    const unsubscribe = firestore().collection('Users').onSnapshot(querySnapshot => {
      if (querySnapshot) {
        const users = [];
        querySnapshot.forEach(documentSnapshot => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        console.log('Users: ', users);
      } else {
        console.log('No users found');
      }
    });
  
    return () => unsubscribe();
  }, []);
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
  const [Name, setName] = useState('');
  const [Surname, setSurname] = useState('');
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [TcId, setTcId] = useState('');
  const [isTasiyici, setIsTasiyici] = useState(false);

  const addUser = async () => {
    try {
      await firestore().collection('Users').add({
        Name,
        Surname,
        PhoneNumber,
        TcId,
        isTasiyici,
      });
      console.log('User added!');
      // Kullanıcı eklendikten sonra gerekli işlemler yapılabilir
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
