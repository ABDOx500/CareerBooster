import React from 'react';
import { Text, View, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../../styles/styles';
import AppHeader from '../../ui/AppHeader';

function CoursesScreen({ navigation }) {
  const jobDomains = [
    { id: '1', title: 'Software Development', icon: 'code-outline' },
    { id: '2', title: 'Data Science', icon: 'analytics-outline' },
    { id: '3', title: 'UI/UX Design', icon: 'color-palette-outline' },
    { id: '4', title: 'Digital Marketing', icon: 'megaphone-outline' },
    { id: '5', title: 'Project Management', icon: 'briefcase-outline' },
    { id: '6', title: 'Cybersecurity', icon: 'shield-outline' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        showSearch={true}
        showBackButton={false}
        showProfile={true}
      />
      <View style={styles.content}>
        <Text style={styles.subtitle}>Select a domain to explore top skills</Text>
        
        <FlatList
          data={jobDomains}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.domainCard}
              onPress={() => navigation.navigate('DomainSkills', { domain: item })}
            >
              <View style={styles.domainIconContainer}>
                <Ionicons name={item.icon} size={40} color="#FFFFFF" />
              </View>
              <Text style={styles.domainTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

export default CoursesScreen; 