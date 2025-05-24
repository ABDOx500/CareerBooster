import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/auth/LoginScreen';
import RegisterScreen from '../components/auth/RegisterScreen';
import UserTypeScreen from '../components/auth/UserTypeScreen';

const Stack = createStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="UserType">
      <Stack.Screen name="UserType" component={UserTypeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} initialParams={{ userType: 'consumer' }} />
      <Stack.Screen name="Register" component={RegisterScreen} initialParams={{ userType: 'consumer' }} />
    </Stack.Navigator>
  );
}

export default AuthNavigator; 