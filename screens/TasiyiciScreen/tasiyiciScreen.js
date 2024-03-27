import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./tasiyiciScreen.style";

const TasiyiciScreen = ({ navigation }) => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const userRef = firestore().collection('Nakils').where('confirmation', '==', false);
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

  const handleOffer = async (id) => {
    const userEmail = await AsyncStorage.getItem('@email');
    Alert.alert(
      'Teklif Ver',
      'Bu ilana teklif vermek istediğinizden emin misiniz?',
      [
        {
          text: 'Hayır',
          style: 'cancel',
        },
        {
          text: 'Evet',
          onPress: async () => {
            try {
              await firestore().collection('Nakils').doc(id).update({ visible: false, carrier: userEmail });
              Alert.alert('Teklif Verildi', 'Teklifiniz başarıyla verildi.');
              fetchAdvertisements();
            } catch (error) {
              console.error('Error updating advertisement:', error);
              Alert.alert('Hata', 'Teklif verme işlemi sırasında bir hata oluştu.');
            }
          },
        },
      ],
    );
  };

  const renderAdvertisementItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOffer(item.id)}>
      <View style={styles.advertisementItem}>
        <Text style={styles.title}>İşveren: {item.advertiser}</Text>
        <Text style={styles.title}>Nereden: {item.from}</Text>
        <Text style={styles.title}>Nereye: {item.where}</Text>
        <Text style={styles.title}>Fiyat: {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={advertisements}
        renderItem={renderAdvertisementItem}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.ButtonContainer}>
      <Button title="Tekliflerimi görüntüle" onPress={() => navigation.navigate('TasOffers')} />
      </View>
    </View>
  );
};

export default TasiyiciScreen;
