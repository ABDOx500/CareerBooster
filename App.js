import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import '@expo/metro-runtime';

// --- Home Screen ---
function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Welcome back to CareerBooster!</Text>
      <Text style={styles.paragraph}>Get personalized skill analysis and course recommendations tailored to your profile.</Text>
    </SafeAreaView>
  );
}

// --- Upload Screen ---
function UploadScreen() {
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');

  const pickFile = () => {
    // TODO: integrate react-native-document-picker
    setFileName('example_cv.pdf');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Upload Your CV</Text>
      <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
        <Text>{fileName || 'Select CV (PDF)'}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Paste Job Offer or LinkedIn URL"
        value={url}
        onChangeText={setUrl}
        autoCapitalize="none"
      />
      <Button title="Submit" onPress={() => {/* TODO: call analyze endpoint */}} disabled={!fileName || !url} />
    </SafeAreaView>
  );
}

// --- Analysis Screen ---
function AnalysisScreen() {
  // Replace with actual data from API
  const matchScore = 82;
  const missing = ['Project Management', 'Python', 'SEO'];
  const enhancements = ['Tailor experience to project-based roles'];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Analysis Results</Text>
      <View style={styles.scoreCircle}>
        <Text style={styles.scoreText}>{matchScore}</Text>
      </View>
      <Text style={styles.subheading}>Missing Skills</Text>
      {missing.map((skill, i) => <Text key={i} style={styles.bullet}>• {skill}</Text>)}
      <Text style={styles.subheading}>Suggested Enhancements</Text>
      {enhancements.map((e, i) => <Text key={i} style={styles.bullet}>• {e}</Text>)}
    </SafeAreaView>
  );
}

// --- Courses Screen ---
function CoursesScreen() {
  // Replace with real data
  const data = [
    { id: '1', title: 'Project Management Fundamentals', provider: 'Udemy' },
    { id: '2', title: 'Python for Data Science', provider: 'Coursera' },
    { id: '3', title: 'Intro to SEO', provider: 'Udemy' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Course Suggestions</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.courseCard}>
            <View>
              <Text style={styles.courseTitle}>{item.title}</Text>
              <Text style={styles.courseProvider}>{item.provider}</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.link}>View</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

// --- Profile Screen ---
function ProfileScreen() {
  // TODO: pull user from context or Redux
  const user = { name: 'John Doe', email: 'john@example.com' };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>
      <Text style={styles.paragraph}>Name: {user.name}</Text>
      <Text style={styles.paragraph}>Email: {user.email}</Text>
      <Button title="Sign Out" onPress={() => {/* TODO: handle logout */}} />
    </SafeAreaView>
  );
}

// --- Navigation Setup ---
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({           
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Upload') iconName = 'cloud-upload';
            else if (route.name === 'Analysis') iconName = 'analytics';
            else if (route.name === 'Courses') iconName = 'book';
            else if (route.name === 'Profile') iconName = 'person-circle';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#0066CC',
          tabBarInactiveTintColor: 'gray',
          headerShown: false
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Upload" component={UploadScreen} />
        <Tab.Screen name="Analysis" component={AnalysisScreen} />
        <Tab.Screen name="Courses" component={CoursesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '600', marginBottom: 12 },
  subheading: { fontSize: 18, fontWeight: '500', marginTop: 16 },
  paragraph: { fontSize: 16, marginBottom: 8 },
  uploadBox: { borderWidth: 1, borderStyle: 'dashed', borderColor: '#ccc', padding: 20, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8, marginBottom: 12 },
  scoreCircle: { width: 120, height: 120, borderRadius: 60, borderWidth: 10, borderColor: '#e6e6e6', justifyContent: 'center', alignItems: 'center', alignSelf: 'center', marginVertical: 20 },
  scoreText: { fontSize: 32, fontWeight: '700', color: '#0066CC' },
  bullet: { fontSize: 16, marginLeft: 8 },
  courseCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderWidth: 1, borderColor: '#eee', borderRadius: 6, marginBottom: 8 },
  courseTitle: { fontSize: 16, fontWeight: '500' },
  courseProvider: { fontSize: 14, color: 'gray' },
  link: { fontSize: 16, color: '#0066CC' }
});

