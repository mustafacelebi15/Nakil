import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert, ScrollView, ImageBackground} from 'react-native';
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

    let statusText = '';
    switch (item.pos) {
      case 0:
        statusText = 'Onay Bekliyor';
        break;
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
            onPress: () => increaseStatus(item.id),
          },
        ],
        { cancelable: false }
      );
    };
  
    const increaseStatus = async (advertisementId) => {
      try {
        const adRef = firestore().collection('Nakils').doc(advertisementId);
        const doc = await adRef.get();
    
        if (!doc.exists) {
          console.log('İlan bulunamadı');
          return;
        }
    
        const currentStatus = doc.data().pos;
        const newStatus = currentStatus + 1;
    
        await adRef.update({ pos: newStatus });
        Alert.alert('Başarılı', 'Durum başarıyla arttırıldı.');
        setStatus(status+1);
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
      <ImageBackground style={styles.imageBackground} source={require('../../Assets/splashscrn.png')} >
        <View style={styles.ButtonContainer}>
      <Button title="Çıkış Yap" onPress={removeLoginInfo} />
      </View>
     <ScrollView>
      <View style= {styles.contentContainer}>
      <FlatList
        data={advertisements}
        renderItem={renderAdvertisementItem}
        keyExtractor={(item) => item.id}
      />
      </View>
      </ScrollView>
    </ImageBackground>
    </View>
  );
};

export default TasOffers;
