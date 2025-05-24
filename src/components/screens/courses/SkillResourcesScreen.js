import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList, ActivityIndicator, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../../styles/styles';
import { COLORS } from '../../../styles/Colors';
import AppHeader from '../../ui/AppHeader';

function SkillResourcesScreen({ route, navigation }) {
  const { skill, domain } = route.params;
  const [activeTab, setActiveTab] = useState('Courses');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  
  // Function to simulate API call to get resources
  const fetchResources = async (resourceType) => {
    setIsSearching(true);
    
    // In a real implementation, we would call our Python API here
    // For demo purposes, just simulate a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSearching(false);
  };
  
  useEffect(() => {
    // When the tab changes, simulate fetching new data
    fetchResources(activeTab);
  }, [activeTab]);
  
  // Mock data for resources with enhanced details
  const resources = {
    Courses: [
      { id: '1', title: 'Complete Guide to ' + skill.name, provider: 'Udemy', rating: 4.8, price: '$14.99', reviewCount: '3,456', difficulty: 'Beginner', duration: '12h 30m', url: 'https://udemy.com' },
      { id: '2', title: skill.name + ' for Beginners', provider: 'Coursera', rating: 4.7, price: '$39.99/month', reviewCount: '2,129', difficulty: 'Beginner', duration: '8 weeks', url: 'https://coursera.org' },
      { id: '3', title: 'Advanced ' + skill.name + ' Masterclass', provider: 'edX', rating: 4.6, price: '$49.99', reviewCount: '1,875', difficulty: 'Advanced', duration: '10 weeks', url: 'https://edx.org' },
      { id: '4', title: 'Practical ' + skill.name + ' Projects', provider: 'Pluralsight', rating: 4.5, price: '$29.99/month', reviewCount: '1,254', difficulty: 'Intermediate', duration: '18h 45m', url: 'https://pluralsight.com' },
      { id: '5', title: skill.name + ' Certification Course', provider: 'LinkedIn Learning', rating: 4.9, price: '$19.99/month', reviewCount: '5,678', difficulty: 'All Levels', duration: '15h 20m', url: 'https://linkedin.com/learning' },
    ],
    Websites: [
      { id: '1', title: skill.name + ' Documentation', description: 'Official documentation with complete API reference and examples', url: 'https://docs.example.com/' + skill.name.toLowerCase(), type: 'Documentation', lastUpdated: 'Updated weekly' },
      { id: '2', title: skill.name + ' Community Hub', description: 'Join discussions with experts and enthusiasts worldwide', url: 'https://community.example.com/' + skill.name.toLowerCase(), type: 'Community', lastUpdated: 'Active daily' },
      { id: '3', title: 'Learn ' + skill.name + ' Today', description: 'Step-by-step tutorials with interactive coding exercises', url: 'https://learn.example.com/' + skill.name.toLowerCase(), type: 'Tutorial', lastUpdated: 'Updated monthly' },
      { id: '4', title: skill.name + ' Tutorial Point', description: 'Comprehensive guides with practical examples', url: 'https://www.tutorialpoint.com/' + skill.name.toLowerCase(), type: 'Tutorial', lastUpdated: 'Updated quarterly' },
      { id: '5', title: 'Free ' + skill.name + ' Resources', description: 'Collection of free tools, templates and guides', url: 'https://free-resources.example.com/' + skill.name.toLowerCase(), type: 'Resources', lastUpdated: 'Updated weekly' },
    ],
    Books: [
      { id: '1', title: 'Mastering ' + skill.name, author: 'John Smith', year: '2023', price: '$35.99', publisher: 'O\'Reilly Media', pages: '548', isbn: '978-1-4919-9828-4', url: 'https://amazon.com' },
      { id: '2', title: skill.name + ' From Zero to Hero', author: 'Jane Doe', year: '2022', price: '$28.50', publisher: 'No Starch Press', pages: '324', isbn: '978-1-7185-0153-2', url: 'https://amazon.com' },
      { id: '3', title: 'Pro ' + skill.name + ' Techniques', author: 'David Wilson', year: '2023', price: '$42.99', publisher: 'Apress', pages: '672', isbn: '978-1-4842-8856-3', url: 'https://amazon.com' },
      { id: '4', title: 'Essential ' + skill.name + ' Guide', author: 'Sarah Johnson', year: '2021', price: '$24.99', publisher: 'Packt Publishing', pages: '412', isbn: '978-1-8392-1994-5', url: 'https://amazon.com' },
      { id: '5', title: skill.name + ' For Professionals', author: 'Michael Brown', year: '2022', price: '$39.99', publisher: 'Wiley', pages: '524', isbn: '978-1-1191-8653-3', url: 'https://amazon.com' },
    ]
  };

  // Get provider icon and color
  const getProviderInfo = (provider) => {
    const providerMap = {
      'Udemy': { icon: 'school-outline', color: '#A435F0' },
      'Coursera': { icon: 'globe-outline', color: '#0056D2' },
      'edX': { icon: 'school-outline', color: '#02262B' },
      'Pluralsight': { icon: 'desktop-outline', color: '#F15B2A' },
      'LinkedIn Learning': { icon: 'logo-linkedin', color: '#0077B5' },
      'DataCamp': { icon: 'analytics-outline', color: '#03EF62' },
      'Udacity': { icon: 'rocket-outline', color: '#01B3E3' },
    };
    
    return providerMap[provider] || { icon: 'school-outline', color: COLORS.primary };
  };
  
  // Get website icon based on type
  const getWebsiteInfo = (type) => {
    const typeMap = {
      'Documentation': { icon: 'document-text-outline', color: '#4285F4' },
      'Community': { icon: 'people-outline', color: '#34A853' },
      'Tutorial': { icon: 'create-outline', color: '#FBBC05' },
      'Resources': { icon: 'folder-open-outline', color: '#EA4335' },
    };
    
    return typeMap[type] || { icon: 'globe-outline', color: '#f5a623' };
  };
  
  // Get book icon based on publisher
  const getPublisherInfo = (publisher) => {
    const publisherMap = {
      'O\'Reilly Media': { icon: 'book-outline', color: '#B52E31' },
      'No Starch Press': { icon: 'terminal-outline', color: '#000000' },
      'Apress': { icon: 'code-slash-outline', color: '#6AAA3B' },
      'Packt Publishing': { icon: 'library-outline', color: '#1E5D88' },
      'Wiley': { icon: 'newspaper-outline', color: '#2C5898' },
    };
    
    return publisherMap[publisher] || { icon: 'library-outline', color: '#8e44ad' };
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

  const renderCourseItem = ({ item }) => {
    const { icon, color } = getProviderInfo(item.provider);
    
    return (
      <View style={styles.enhancedResourceCard}>
        <View style={styles.resourceCardHeader}>
          <View style={[styles.courseIconContainer, {backgroundColor: color}]}>
            <Ionicons name={icon} size={24} color={COLORS.white} />
          </View>
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <View style={styles.resourceMeta}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating} ({item.reviewCount})</Text>
              </View>
              <View style={styles.difficultyContainer}>
                <Ionicons name="medal-outline" size={16} color={COLORS.gray} />
                <Text style={styles.difficultyText}>{item.difficulty}</Text>
              </View>
              <View style={styles.durationContainer}>
                <Ionicons name="time-outline" size={16} color={COLORS.gray} />
                <Text style={styles.durationText}>{item.duration}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.resourceCardFooter}>
          <Text style={styles.resourcePrice}>{item.price}</Text>
          <TouchableOpacity 
            style={styles.enhancedEnrollButton}
            onPress={() => {
              // In a real app, we would open the course URL or in-app view
              console.log('Enrolling in course:', item.title);
            }}
          >
            <Text style={styles.enrollText}>Enroll Now</Text>
            <Ionicons name="arrow-forward" size={16} color={COLORS.white} style={{marginLeft: 6}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderWebsiteItem = ({ item }) => {
    const { icon, color } = getWebsiteInfo(item.type);
    
    return (
      <View style={styles.enhancedResourceCard}>
        <View style={styles.resourceCardHeader}>
          <View style={[styles.courseIconContainer, {backgroundColor: color}]}>
            <Ionicons name={icon} size={24} color={COLORS.white} />
          </View>
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <Text style={styles.resourceDescription}>{item.description}</Text>
            <View style={styles.resourceMeta}>
              <View style={styles.typeContainer}>
                <Ionicons name="pricetag-outline" size={14} color={COLORS.gray} />
                <Text style={styles.typeText}>{item.type}</Text>
              </View>
              <View style={styles.updateContainer}>
                <Ionicons name="refresh-outline" size={14} color={COLORS.gray} />
                <Text style={styles.updateText}>{item.lastUpdated}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.resourceCardFooter}>
          <Text style={styles.resourceUrl} numberOfLines={1} ellipsizeMode="middle">{item.url}</Text>
          <TouchableOpacity 
            style={styles.enhancedVisitButton}
            onPress={() => {
              // In a real app, we would open the website URL
              console.log('Visiting website:', item.url);
            }}
          >
            <Text style={styles.visitText}>Visit Site</Text>
            <Ionicons name="open-outline" size={16} color={COLORS.white} style={{marginLeft: 6}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderBookItem = ({ item }) => {
    const { icon, color } = getPublisherInfo(item.publisher);
    
    return (
      <View style={styles.enhancedResourceCard}>
        <View style={styles.resourceCardHeader}>
          <View style={[styles.courseIconContainer, {backgroundColor: color}]}>
            <Ionicons name={icon} size={24} color={COLORS.white} />
          </View>
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceTitle}>{item.title}</Text>
            <Text style={styles.resourceAuthor}>by {item.author} ({item.year})</Text>
            <View style={styles.resourceMeta}>
              <View style={styles.publisherContainer}>
                <Ionicons name="business-outline" size={14} color={COLORS.gray} />
                <Text style={styles.publisherText}>{item.publisher}</Text>
              </View>
              <View style={styles.pagesContainer}>
                <Ionicons name="document-outline" size={14} color={COLORS.gray} />
                <Text style={styles.pagesText}>{item.pages} pages</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.resourceCardFooter}>
          <Text style={styles.resourcePrice}>{item.price}</Text>
          <TouchableOpacity 
            style={styles.enhancedBuyButton}
            onPress={() => {
              // In a real app, we would open the book purchase URL
              console.log('Buying book:', item.title);
            }}
          >
            <Text style={styles.buyText}>Buy Now</Text>
            <Ionicons name="cart-outline" size={16} color={COLORS.white} style={{marginLeft: 6}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        showSearch={false}
        showBackButton={true}
        title={skill.name}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Courses' && styles.activeTab]}
          onPress={() => setActiveTab('Courses')}
        >
          <Ionicons 
            name="school-outline" 
            size={20} 
            color={activeTab === 'Courses' ? COLORS.primary : COLORS.gray} 
          />
          <Text style={[styles.tabText, activeTab === 'Courses' && styles.activeTabText]}>Courses</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Websites' && styles.activeTab]}
          onPress={() => setActiveTab('Websites')}
        >
          <Ionicons 
            name="globe-outline" 
            size={20} 
            color={activeTab === 'Websites' ? COLORS.primary : COLORS.gray} 
          />
          <Text style={[styles.tabText, activeTab === 'Websites' && styles.activeTabText]}>Websites</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Books' && styles.activeTab]}
          onPress={() => setActiveTab('Books')}
        >
          <Ionicons 
            name="book-outline" 
            size={20} 
            color={activeTab === 'Books' ? COLORS.primary : COLORS.gray} 
          />
          <Text style={[styles.tabText, activeTab === 'Books' && styles.activeTabText]}>Books</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.skillInfoCard}>
          <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
          <Text style={styles.skillInfoText}>
            {skill.name} is a {skill.level.toLowerCase()} skill for careers in {domain.title}.
          </Text>
        </View>
        
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Finding the best {activeTab.toLowerCase()} for {skill.name}...</Text>
          </View>
        ) : (
          <FlatList
            data={resources[activeTab]}
            keyExtractor={item => item.id}
            renderItem={
              activeTab === 'Courses' ? renderCourseItem :
              activeTab === 'Websites' ? renderWebsiteItem :
              renderBookItem
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color={COLORS.mediumGray} />
                <Text style={styles.emptyStateText}>No {activeTab.toLowerCase()} found for {skill.name}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => fetchResources(activeTab)}>
                  <Text style={styles.retryButtonText}>Try Again</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

export default SkillResourcesScreen; 