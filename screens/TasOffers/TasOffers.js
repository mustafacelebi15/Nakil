import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./TasOffers.style";

const TasOffers = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    getEmailAndFetchUser();
  }, []);

  const getEmailAndFetchUser = async () => {
    try {
      const userEmail = await AsyncStorage.getItem('@email');
      setEmail(userEmail);
      fetchAdvertisements(userEmail);
    } catch (error) {
      console.error('Error getting email:', error);
    }
  };

  const fetchAdvertisements = async (userEmail) => {
    try {
      const userRef = firestore().collection('Nakils').where('carrier', '==', userEmail);
      const snapshot = await userRef.get();

      if (snapshot.empty) {
        console.log('Teklif Bulunamadı');
        return;
      }

      const adsList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdvertisements(adsList);
      console.log(adsList);
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  };

  const renderAdvertisementItem = ({ item }) => (
    <View style={styles.advertisementItem}>
      <Text style={styles.title}>Taşıyıcı: {item.carrier}</Text>
      <Text style={styles.title}>Nereden: {item.from}</Text>
      <Text style={styles.title}>Nereye: {item.where}</Text>
      <Text style={styles.title}>Fiyat: {item.price}</Text>
      <Text style={styles.title}>{item.confirmation ? "Onaylandı" : "Bekleniyor"}</Text>
    </View>
);

return (
    <View style={styles.container}>
      <FlatList
        data={advertisements}
        renderItem={renderAdvertisementItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default TasOffers;
