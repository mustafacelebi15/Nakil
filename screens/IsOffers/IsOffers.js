import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./IsOffers.style";

const IsOffers = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    fetchAdvertisements();
  }, []);

  const fetchAdvertisements = async () => {
    try {
      const userRef = firestore().collection('Nakils').where('confirmation', '==', false).where('visible', '==', false);
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
  const handleApproval = async (id) => {
    try {
      await firestore().collection('Nakils').doc(id).update({ confirmation: true });
      console.log('Advertisement approved successfully');
    } catch (error) {
      console.error('Error approving advertisement:', error);
    }
  };
  
  const handleRejection = async (id) => {
    try {
      await firestore().collection('Nakils').doc(id).update({visible: true, carrier: ''});
      console.log('Advertisement rejected successfully');
    } catch (error) {
      console.error('Error rejecting advertisement:', error);
    }
  };
  

  const renderAdvertisementItem = ({ item }) => (
      <View style={styles.advertisementItem}>
        <Text style={styles.title}>Taşıyıcı: {item.carrier}</Text>
        <Text style={styles.title}>Nereden: {item.from}</Text>
        <Text style={styles.title}>Nereye: {item.where}</Text>
        <Text style={styles.title}>Fiyat: {item.price}</Text>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonaccept} onPress={() => handleApproval(item.id)}>
          <Text style={styles.buttonText}>Onayla</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonreject} onPress={() => handleRejection(item.id)}>
          <Text style={styles.buttonText}>Reddet</Text>
        </TouchableOpacity>
        </View>
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

export default IsOffers;
