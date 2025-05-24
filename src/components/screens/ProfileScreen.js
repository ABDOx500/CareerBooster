import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../styles/styles';

function ProfileScreen() {
  const { user, logout } = useAuth();

  // Handle case where user might be null briefly during logout transition
  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.logoImage} />
            <Text style={styles.subtitle}>Profile</Text>
          </View>
        </View>
        <View style={[styles.content, styles.centerContent]}>
          <ActivityIndicator size="large" color="#0077B5" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.logoImage} />
          <Text style={styles.subtitle}>Profile</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        {/* Profile Info Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</Text>
          </View>
          <Text style={styles.profileNameText}>{user.name || 'User Name'}</Text>
          <Text style={styles.profileEmailText}>{user.email || 'user@example.com'}</Text>
        </View>

        {/* Menu Options Card */}
        <View style={styles.profileMenuCard}>
          <TouchableOpacity style={styles.profileMenuItem} onPress={() => {/* TODO: Navigate to Settings */}}>
            <Ionicons name="settings-outline" size={24} color="#0077B5" style={styles.profileMenuItemIcon} />
            <Text style={styles.profileMenuItemText}>Settings</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#86888A" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.profileMenuItem} onPress={() => {/* TODO: Navigate to Help */}}>
            <Ionicons name="help-circle-outline" size={24} color="#0077B5" style={styles.profileMenuItemIcon} />
            <Text style={styles.profileMenuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward-outline" size={22} color="#86888A" />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={[styles.button, styles.signOutButton]}
          onPress={logout}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen; 