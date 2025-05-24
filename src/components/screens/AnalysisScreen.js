import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/styles';
import AppHeader from '../ui/AppHeader';

function AnalysisScreen() {
  // Replace with actual data from API
  const matchScore = 90;
  const missing = ['Project Management', 'Python', 'SEO'];
  const enhancements = ['Tailor experience to project-based roles'];

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        showSearch={false} 
        title="CV Analysis" 
        showBackButton={true}
      />
      <View style={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Match Score</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{matchScore}%</Text>
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Missing Skills</Text>
          {missing.map((skill, i) => 
            <View key={i} style={styles.skillItem}>
              <Ionicons name="close-circle" size={20} color="#e93445" />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Suggested Enhancements</Text>
          {enhancements.map((e, i) => 
            <View key={i} style={styles.skillItem}>
              <Ionicons name="arrow-up-circle" size={20} color="#0077B5" />
              <Text style={styles.skillText}>{e}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default AnalysisScreen; 