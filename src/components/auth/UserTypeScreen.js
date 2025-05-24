import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Image, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/styles';

function UserTypeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.loginLogoContainer}>
          <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.loginLogoImage} />
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.heading}>Welcome to CareerBooster</Text>
        <Text style={styles.paragraph}>Your career development assistant</Text>
        
        <TouchableOpacity 
          style={styles.userTypeCard}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login', { userType: 'consumer' })}
        >
          <View style={styles.userTypeIconContainer}>
            <Ionicons name="briefcase-outline" size={48} color="#0077B5" />
          </View>
          <Text style={styles.userTypeTitle}>Career Development</Text>
          <Text style={styles.userTypeDesc}>Analyze your CV, get skill recommendations, and discover relevant courses</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default UserTypeScreen; 