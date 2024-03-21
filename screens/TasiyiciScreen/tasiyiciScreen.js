import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./tasiyiciScreen.style";

const TasiyiciScreen = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetchUserByEmail();
  }, []);
  const fetchUserByEmail = async () => {
    try {
      const userRef = firestore().collection('Nakils').where('confirmation', '==', false);
      const snapshot = await userRef.get();
  
      if (snapshot.empty) {
        console.log('Teklif Bulunamadı');
        return;
      }
  
      const adsList = snapshot.docs.map(doc => doc.data());
      setAdvertisements(adsList);
    } catch (error) {
      console.error('Error fetching user by email:', error);
    }
  };
  const renderAdvertisementItem = ({ item }) => (
    <View style={styles.advertisementItem}>
      <Text style={styles.title}>İşveren: {item.advertiser}</Text>
      <Text style={styles.title}>Nereden: {item.from}</Text>
      <Text style={styles.title}>Nereye: {item.where}</Text>
      <Text style={styles.title}>Fiyat: {item.price}</Text>

    </View>
  );
  return (
    <View style={styles.container}>
       <FlatList
      data={advertisements}
      renderItem={renderAdvertisementItem}
      keyExtractor={(item, index) => index.toString()}
    />
    </View>
  );
};

export default TasiyiciScreen;