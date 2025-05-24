import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ScrollView, Image, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../styles/styles';

function RegisterScreen({ route, navigation }) {
  const { userType } = route.params;
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Password123');
  const [confirmPassword, setConfirmPassword] = useState('Password123');
  const [errorMsg, setErrorMsg] = useState('');
  const { register, isLoading } = useAuth();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    setErrorMsg('');
    // Validation
    if (!name) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email) {
      setErrorMsg('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter a password');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    
    // Attempt registration
    register(name, email, password, userType);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.loginLogoContainer}>
          <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.loginLogoImage} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.formSubtitle}>Sign up to get started</Text>
        
        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color="#e93445" />
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color="#86888A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        
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
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color="#86888A" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          disabled={isLoading}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.textLink}
          onPress={() => navigation.navigate('Login', { userType })}
        >
          <Text style={styles.textLinkText}>Already have an account? <Text style={styles.textLinkBold}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default RegisterScreen; 