import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../styles/Colors';

// Import screens for tab navigation
import HomeScreen from '../components/screens/HomeScreen';
import UploadScreen from '../components/screens/UploadScreen';
import CVGenerationScreen from '../components/screens/CVGenerationScreen';
import CoursesScreen from '../components/screens/courses/CoursesScreen';
import ProfileScreen from '../components/screens/ProfileScreen';

// Import screens for stack navigation
import AnalysisScreen from '../components/screens/AnalysisScreen';
import DomainSkillsScreen from '../components/screens/courses/DomainSkillsScreen';
import SkillResourcesScreen from '../components/screens/courses/SkillResourcesScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Consumer Tab Navigator
function ConsumerTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Career') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'CVBuilder') {
            iconName = focused ? 'document-text' : 'document-text-outline';
          } else if (route.name === 'Courses') {
            iconName = focused ? 'book' : 'book-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        tabBarStyle: { backgroundColor: COLORS.white, borderTopColor: COLORS.mediumGray },
        tabBarLabelStyle: { fontWeight: '500' },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Career" component={UploadScreen} options={{ title: 'Analysis' }} />
      <Tab.Screen name="CVBuilder" component={CVGenerationScreen} options={{ title: 'CV Builder' }} />
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Consumer Stack Navigator
function ConsumerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={ConsumerTabNavigator} />
      <Stack.Screen name="Analysis" component={AnalysisScreen} />
      <Stack.Screen name="DomainSkills" component={DomainSkillsScreen} />
      <Stack.Screen name="SkillResources" component={SkillResourcesScreen} />
    </Stack.Navigator>
  );
}

export default ConsumerStack; 