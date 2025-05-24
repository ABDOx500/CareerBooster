import React from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/styles';

function HomeScreen({ navigation }) {
  // Mock data for analysis 
  const matchScore = 85;
  const missing = ['Project Management', 'Python', 'SEO'];
  const enhancements = ['Tailor experience to project-based roles'];
  
  // Mock data for course recommendations
  const courses = [
    { id: '1', title: 'Project Management Fundamentals', provider: 'Udemy', rating: 4.8 },
    { id: '2', title: 'Python for Data Science', provider: 'Coursera', rating: 4.7 },
    { id: '3', title: 'Intro to SEO', provider: 'Udemy', rating: 4.5 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboardHeader}>        
        <View style={styles.logoContainer}>          
          <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.logoImage} />        
        </View>        
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>          
          <View style={styles.headerProfileIcon}>            
            <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />          
          </View>        
        </TouchableOpacity>      
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.greeting}>Hello, John!</Text>
        <Text style={styles.subtitle}>Your latest analysis results</Text>
        
        {/* Analysis Cards */}
        <View style={styles.analysisCard}>
          <Text style={styles.cardHeading}>Match Score</Text>
          <View style={styles.scoreCircle}>
            <Text style={styles.scoreText}>{matchScore}%</Text>
          </View>
        </View>
        
        <View style={styles.analysisCard}>
          <Text style={styles.cardHeading}>Missing Skills</Text>
          {missing.map((skill, i) => 
            <View key={i} style={styles.skillItem}>
              <Ionicons name="close-circle" size={20} color="#e93445" />
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.cardActionButton}>
            <Text style={styles.cardActionText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.analysisCard}>
          <Text style={styles.cardHeading}>Suggested Enhancements</Text>
          {enhancements.map((e, i) => 
            <View key={i} style={styles.skillItem}>
              <Ionicons name="arrow-up-circle" size={20} color="#0077B5" />
              <Text style={styles.skillText}>{e}</Text>
            </View>
          )}
        </View>
        
        {/* Course Recommendations */}
        <Text style={[styles.subtitle, {marginTop: 20}]}>Recommended Courses</Text>
        
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseIconContainer}>
              <Ionicons name="book-outline" size={30} color="#FFFFFF" />
            </View>
            <View style={styles.courseInfo}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseProvider}>{course.provider} • {course.rating}★</Text>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity 
            style={[styles.button, {marginVertical: 20, flex: 0.48}]} 
            onPress={() => navigation.navigate('Career')}
          >
            <Text style={styles.buttonText}>Analyze CV</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, {marginVertical: 20, flex: 0.48}]} 
            onPress={() => navigation.navigate('CVBuilder')}
          >
            <Text style={styles.buttonText}>Build CV</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen; 