import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../styles/styles';

function LoginScreen({ route, navigation }) {
  const { userType } = route.params;
  const [email, setEmail] = useState('test@example.com'); // Pre-filled for development
  const [password, setPassword] = useState('Password123'); // Pre-filled for development
  const [errorMsg, setErrorMsg] = useState('');
  const { login, isLoading } = useAuth();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setErrorMsg('');
    // Validation
    if (!email) {
      setErrorMsg('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }
    
    // Attempt login
    login(email, password, userType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.loginLogoContainer}>
          <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.loginLogoImage} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.heading}>Sign In</Text>
        <Text style={styles.formSubtitle}>Sign in to continue</Text>
        
        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#e93445" />
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color="#86888A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#86888A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          disabled={isLoading}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.textLink}
          onPress={() => navigation.navigate('Register', { userType })}
        >
          <Text style={styles.textLinkText}>Don't have an account? <Text style={styles.textLinkBold}>Sign Up</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreen; 