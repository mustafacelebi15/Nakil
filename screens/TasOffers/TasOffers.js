import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';

import Button from '../../Components/Button';
import styles from "./TasOffers.style";

const TasOffers = () => {
  const [advertisements, setAdvertisements] = useState([]);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  useEffect(() => {
    getEmailAndFetchUser();
  }, [status]);

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

  const renderAdvertisementItem = ({ item }) => {

    setStatus(item.pos)
    let statusText = '';
    switch (status) {
      case 1:
        statusText = 'Taşınmaya Hazır';
        break;
      case 2:
        statusText = 'Yolda';
        break;
      case 3:
        statusText = 'Yükün Alınmayı Bekliyor';
        break;
      case 4:
        statusText = 'Tamamlandı';
        break;
      default:
        statusText = 'Durum Belirsiz';
    }
    const handleStatusIncrease = () => {
      Alert.alert(
        'Onaylıyor musunuz?',
        'Yükün durumunu değiştirmek istediğinize emin misiniz?',
        [
          {
            text: 'Hayır',
            style: 'cancel',
          },
          {
            text: 'Evet',
            onPress: () => increaseStatus(),
          },
        ],
        { cancelable: false }
      );
    };
  
    const increaseStatus = async () => {
      const newStatus = status + 1;
      try {
        await firestore().collection('Nakils').doc(item.id).update({ pos: newStatus });
        setStatus(newStatus);
        Alert.alert('Başarılı', 'Durum başarıyla arttırıldı.');
      } catch (error) {
        console.error('Error updating status:', error);
        Alert.alert('Hata', 'Durum güncelleme işlemi sırasında bir hata oluştu.');
      }
    };
  
    return (
      <View style={styles.advertisementItem}>
        <Text style={styles.title}>Taşıyıcı: {item.carrier}</Text>
        <Text style={styles.title}>Nereden: {item.from}</Text>
        <Text style={styles.title}>Nereye: {item.where}</Text>
        <Text style={styles.title}>Fiyat: {item.price}</Text>
        <Text style={styles.title}>{statusText}</Text>
        <Button title="Yükün durumunu güncelle" onPress={handleStatusIncrease} />
      </View>
    );
  };
  

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
