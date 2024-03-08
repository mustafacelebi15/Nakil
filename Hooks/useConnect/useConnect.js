import React,{ useState, useEffect } from "react";
import NetInfo from '@react-native-community/netinfo';
import { Alert, Linking } from "react-native";

function useConnect() {
  const [isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const checkInternetConnection = async () => {
        const netInfoState = await NetInfo.fetch();
        setIsConnected(netInfoState.isConnected);
      };

      await checkInternetConnection();

      setTimeout(() => {
        if (isConnected === true) {
          console.log(isConnected);
          
        } else if(isConnected === false){
          console.log('Bağlantı:', isConnected);
          showNoInternetAlert();
        }
      }, 2000);
    };

    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    fetchData();

    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  const openSettings = () => {
    Linking.openSettings();
  };

  const showNoInternetAlert = () => {
    Alert.alert(
      'Bağlantı Hatası',
      'İnternet bağlantınızı kontrol etmek için ayarlara gidin',
      [
        {
          text: 'Tamam',
          onPress: openSettings,
        },
      ]
    );
  };
  return {isConnected};
}

export default useConnect;
