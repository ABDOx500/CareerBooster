import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../styles/Colors';
import { useNavigation } from '@react-navigation/native';

const AppHeader = ({ 
  showBackButton = false, 
  showSearch = true,
  showProfile = true,
  title = ''
}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )}
        
        {!showBackButton && (
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Image 
              source={require('../../../Images/cAREERbOOSTER.png')} 
              style={styles.profileImage} 
            />
          </TouchableOpacity>
        )}

        {showSearch ? (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={COLORS.gray} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search"
              placeholderTextColor={COLORS.gray}
            />
          </View>
        ) : (
          <Text style={styles.headerTitle}>{title}</Text>
        )}

        {showProfile && (
          <TouchableOpacity 
            style={styles.messageButton} 
            onPress={() => {/* Add message or chat functionality */}}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={24} color={COLORS.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: COLORS.darkBlue,
    paddingTop: 40, // For status bar
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.darkGray,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 5,
    marginRight: 10,
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.offWhite,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: COLORS.darkGray,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.white,
    textAlign: 'center',
  },
  messageButton: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppHeader; 