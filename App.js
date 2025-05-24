import React, { useState } from 'react';
import { View, Text, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import '@expo/metro-runtime';

// Import styles
import { styles } from './src/styles/styles';
import { COLORS } from './src/styles/Colors';

// Import context
import { AuthProvider, useAuth } from './src/context/AuthContext';

// Import navigators
import AppNavigator from './src/navigation/AppNavigator';
import AuthNavigator from './src/navigation/AuthNavigator';

const Stack = createStackNavigator();

// Root Navigator that checks auth state
function RootNavigator() {
  const { user, isLoading } = useAuth();
  
  // Add error handling
  const [hasError, setHasError] = useState(false);
  
  if (hasError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={{color: COLORS.error, fontSize: 18, marginBottom: 20}}>
          Something went wrong!
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setHasError(false)}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="AppRoot" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}

// Main App Component with Auth State
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}


