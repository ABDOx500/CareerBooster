import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../../styles/styles';
import { COLORS } from '../../../styles/Colors';

function DomainSkillsScreen({ route, navigation }) {
  const { domain } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [skillsData, setSkillsData] = useState({
    '1': [
      { id: '1', name: 'JavaScript', level: 'Essential' },
      { id: '2', name: 'React', level: 'Recommended' },
      { id: '3', name: 'Node.js', level: 'Recommended' },
      { id: '4', name: 'Python', level: 'Valuable' },
      { id: '5', name: 'Git', level: 'Essential' },
      { id: '6', name: 'SQL', level: 'Valuable' },
      { id: '7', name: 'Docker', level: 'Valuable' },
      { id: '8', name: 'AWS', level: 'Recommended' },
      { id: '9', name: 'TypeScript', level: 'Valuable' },
      { id: '10', name: 'GraphQL', level: 'Emerging' },
    ],
    '2': [
      { id: '1', name: 'Python', level: 'Essential' },
      { id: '2', name: 'R', level: 'Recommended' },
      { id: '3', name: 'SQL', level: 'Essential' },
      { id: '4', name: 'Machine Learning', level: 'Essential' },
      { id: '5', name: 'Data Visualization', level: 'Recommended' },
      { id: '6', name: 'Statistical Analysis', level: 'Essential' },
      { id: '7', name: 'Big Data', level: 'Valuable' },
      { id: '8', name: 'Deep Learning', level: 'Valuable' },
      { id: '9', name: 'NLP', level: 'Emerging' },
      { id: '10', name: 'Apache Spark', level: 'Recommended' },
    ],
    '3': [
      { id: '1', name: 'UI Design', level: 'Essential' },
      { id: '2', name: 'Wireframing', level: 'Essential' },
      { id: '3', name: 'Prototyping', level: 'Essential' },
      { id: '4', name: 'User Research', level: 'Recommended' },
      { id: '5', name: 'Adobe XD', level: 'Recommended' },
      { id: '6', name: 'Figma', level: 'Essential' },
      { id: '7', name: 'Visual Design', level: 'Recommended' },
      { id: '8', name: 'Responsive Design', level: 'Essential' },
      { id: '9', name: 'Usability Testing', level: 'Valuable' },
      { id: '10', name: 'Information Architecture', level: 'Valuable' },
    ],
    '4': [
      { id: '1', name: 'SEO', level: 'Essential' },
      { id: '2', name: 'Content Marketing', level: 'Essential' },
      { id: '3', name: 'Social Media Marketing', level: 'Essential' },
      { id: '4', name: 'Google Ads', level: 'Recommended' },
      { id: '5', name: 'Email Marketing', level: 'Recommended' },
      { id: '6', name: 'Google Analytics', level: 'Essential' },
      { id: '7', name: 'CRO', level: 'Valuable' },
      { id: '8', name: 'Marketing Automation', level: 'Valuable' },
      { id: '9', name: 'Affiliate Marketing', level: 'Emerging' },
      { id: '10', name: 'Video Marketing', level: 'Emerging' },
    ],
    '5': [
      { id: '1', name: 'Agile Methodology', level: 'Essential' },
      { id: '2', name: 'Scrum', level: 'Recommended' },
      { id: '3', name: 'Risk Management', level: 'Essential' },
      { id: '4', name: 'Project Planning', level: 'Essential' },
      { id: '5', name: 'Stakeholder Management', level: 'Essential' },
      { id: '6', name: 'Jira', level: 'Recommended' },
      { id: '7', name: 'Budgeting', level: 'Valuable' },
      { id: '8', name: 'MS Project', level: 'Valuable' },
      { id: '9', name: 'Resource Allocation', level: 'Recommended' },
      { id: '10', name: 'Change Management', level: 'Valuable' },
    ],
    '6': [
      { id: '1', name: 'Network Security', level: 'Essential' },
      { id: '2', name: 'Ethical Hacking', level: 'Recommended' },
      { id: '3', name: 'Security Analysis', level: 'Essential' },
      { id: '4', name: 'Cryptography', level: 'Valuable' },
      { id: '5', name: 'Penetration Testing', level: 'Recommended' },
      { id: '6', name: 'SIEM', level: 'Valuable' },
      { id: '7', name: 'Risk Assessment', level: 'Essential' },
      { id: '8', name: 'Secure Coding', level: 'Valuable' },
      { id: '9', name: 'Incident Response', level: 'Recommended' },
      { id: '10', name: 'Cloud Security', level: 'Emerging' },
    ],
  });
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Function to fetch skills
  const fetchSkills = () => {
    setIsLoading(true);
    setError(null);
    
    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date().toLocaleString());
      setIsLoading(false);
    }, 2000);
  };

  // Get the appropriate icon name based on skill name
  const getSkillIcon = (skillName) => {
    const iconMap = {
      'JavaScript': 'logo-javascript',
      'React': 'logo-react',
      'Node.js': 'server-outline',
      'Python': 'code-outline',
      'Git': 'git-branch-outline',
      'SQL': 'server-outline',
      'Docker': 'cube-outline',
      'AWS': 'cloud-outline',
      'TypeScript': 'code-slash-outline',
      'GraphQL': 'analytics-outline',
      'R': 'calculator-outline',
      'Machine Learning': 'brain-outline',
      'Data Visualization': 'bar-chart-outline',
      'Statistical Analysis': 'stats-chart-outline',
      'UI Design': 'color-palette-outline',
      'Wireframing': 'pencil-outline',
      'Prototyping': 'layers-outline',
      'Figma': 'brush-outline',
      'SEO': 'search-outline',
      'Content Marketing': 'document-text-outline',
      'Social Media Marketing': 'share-social-outline',
      'Google Ads': 'megaphone-outline',
      'Email Marketing': 'mail-outline',
      'Agile Methodology': 'infinite-outline',
      'Scrum': 'people-outline',
      'Risk Management': 'shield-outline',
      'Project Planning': 'calendar-outline',
      'Network Security': 'shield-checkmark-outline',
      'Ethical Hacking': 'bug-outline',
      'Cryptography': 'lock-closed-outline',
    };
    
    return iconMap[skillName] || 'star-outline';
  };

  // Get color based on skill level
  const getSolidColor = (level) => {
    switch (level) {
      case 'Essential': return '#0a8528';
      case 'Recommended': return '#0077B5';
      case 'Valuable': return '#f5a623';
      case 'Emerging': return '#00a0dc';
      default: return COLORS.gray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>{domain.title}</Text>
        </View>
        <TouchableOpacity onPress={fetchSkills} disabled={isLoading} style={styles.refreshButton}>
          <Ionicons 
            name={isLoading ? "sync-circle" : "refresh"} 
            size={24} 
            color={COLORS.white} 
            style={isLoading ? {opacity: 0.7} : {}}
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.subtitle}>Top 10 Skills for {domain.title}</Text>
          {lastUpdated && (
            <Text style={styles.lastUpdatedText}>Updated: {lastUpdated}</Text>
          )}
        </View>
        
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Fetching latest skills from LinkedIn...</Text>
            <Text style={styles.loadingSubText}>This may take a minute</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={48} color={COLORS.error} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={[styles.button, {marginTop: 16, backgroundColor: COLORS.primary}]}
              onPress={fetchSkills}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity 
              style={styles.updateButton}
              onPress={fetchSkills}
            >
              <Ionicons name="refresh" size={16} color={COLORS.white} />
              <Text style={styles.updateButtonText}>Refresh Skills from LinkedIn</Text>
            </TouchableOpacity>
            
            <FlatList
              data={skillsData[domain.id]}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.enhancedSkillCard}
                  onPress={() => navigation.navigate('SkillResources', { skill: item, domain: domain })}
                >
                  <View style={[styles.skillIconContainer, {backgroundColor: getSolidColor(item.level)}]}>
                    <Ionicons name={getSkillIcon(item.name)} size={24} color={COLORS.white} />
                  </View>
                  <View style={styles.skillInfo}>
                    <Text style={styles.skillTitle}>{item.name}</Text>
                    <View style={[styles.levelBadge, {backgroundColor: getSolidColor(item.level)}]}>
                      <Text style={styles.levelText}>{item.level}</Text>
                    </View>
                  </View>
                  <View style={styles.arrowContainer}>
                    <Ionicons name="chevron-forward" size={24} color={COLORS.gray} />
                  </View>
                </TouchableOpacity>
              )}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default DomainSkillsScreen; 