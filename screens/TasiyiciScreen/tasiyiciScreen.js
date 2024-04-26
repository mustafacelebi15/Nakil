import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, Alert, ImageBackground} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Button from '../../Components/Button';
import styles from "./tasiyiciScreen.style";
import { ScrollView } from 'react-native-gesture-handler';

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

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.imageBackground} source={require('../../Assets/splashscrn.png')} >
        <View style={styles.ButtonContainer}>
      <Button title="Tekliflerimi görüntüle" onPress={() => navigation.navigate('TasOffers')} />
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

export default TasiyiciScreen;
