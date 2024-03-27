import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

import SignUp from './screens/SignUpScreen';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import Home from './screens/Home';
import IsHome from './screens/IsverenScreen';
import TasHome from './screens/TasiyiciScreen';
import IsOffers from './screens/IsOffers';
import TasOffers from './screens/TasOffers';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="IsHome" component={IsHome} />
      <Stack.Screen name="TasHome" component={TasHome} />
      <Stack.Screen name= "IsOffers" component={IsOffers}/>
      <Stack.Screen name= "TasOffers" component={TasOffers}/>
    </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;