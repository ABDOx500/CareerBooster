import React, { useState, useContext, createContext, useEffect } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, Button, FlatList, StyleSheet, StatusBar, ScrollView, Image, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import '@expo/metro-runtime';

// Create navigator instances
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Modern theme colors
const COLORS = {
  primary: '#0077B5',      // LinkedIn primary blue
  primaryDark: '#005f92',  // Darker blue for pressed states
  secondary: '#0073b1',    // Slightly darker blue
  accent: '#00a0dc',       // Light blue accent
  lightBlue: '#e8f3fc',    // Light blue for backgrounds
  darkBlue: '#004c75',     // Dark blue for headings
  white: '#FFFFFF',
  offWhite: '#f9f9f9',     // Off-white for subtle backgrounds
  lightGray: '#f3f2ef',    // LinkedIn light gray background
  gray: '#86888A',         // Text gray
  mediumGray: '#dce0e6',   // Medium gray for borders
  darkGray: '#333333',     // Dark text
  borderColor: '#e1e9ee',  // LinkedIn border color
  success: '#0a8528',      // Green for success
  error: '#e93445',        // Red for errors
  warning: '#f5a623',      // Yellow for warnings
  inputBg: '#f5f8fa',      // Light blue-gray for input backgrounds
  cardShadow: 'rgba(0, 0, 0, 0.1)' // Shadow color for cards
};

// --- Authentication Context ---
const AuthContext = createContext();

function AuthProvider({ children }) {
  // Initialize without a user so login screen appears
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password, userType) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock user data based on userType
      const userData = {
        id: '123',
        name: 'John Doe',
        email: email,
        userType: 'consumer', // Always consumer for CareerBooster
      };
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  };

  const register = (name, email, password, userType) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '123',
        name: name,
        email: email,
        userType: 'consumer', // Always consumer for CareerBooster
      };
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use authentication context
function useAuth() {
  return useContext(AuthContext);
}

// --- Home Screen ---
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
                <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />        
              </View>        
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>          
                <View style={styles.headerProfileIcon}>            
                  <Ionicons name="person-circle-outline" size={32} color={COLORS.white} />          
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
              <Ionicons name="arrow-up-circle" size={20} color={COLORS.primary} />
              <Text style={styles.skillText}>{e}</Text>
            </View>
          )}
        </View>
        
        {/* Course Recommendations */}
        <Text style={[styles.subtitle, {marginTop: 20}]}>Recommended Courses</Text>
        
        {courses.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <View style={styles.courseIconContainer}>
              <Ionicons name="book-outline" size={30} color={COLORS.white} />
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
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />
                <Text style={styles.subtitle}>CV Analysis</Text>
              </View>
            </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
          <Ionicons name="cloud-upload-outline" size={48} color={COLORS.primary} />
          <Text style={styles.uploadText}>{fileName || 'Select CV (PDF)'}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Paste Job Offer or LinkedIn URL"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={[styles.button, (!fileName || !url) && styles.buttonDisabled]} 
          disabled={!fileName || !url}
          onPress={() => {/* TODO: call analyze endpoint */}}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// --- CV Builder Screen ---
function CVGenerationScreen({ navigation }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 123 456 7890',
    title: 'Software Engineer',
    summary: 'Experienced software engineer with 5+ years in web and mobile development.'
  });
  
  const [skills, setSkills] = useState([
    'JavaScript', 'React', 'Node.js', 'Python', 'UX/UI Design'
  ]);
  
  const [newSkill, setNewSkill] = useState('');
  const [fileName, setFileName] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const removeSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const pickFile = () => {
    // TODO: integrate react-native-document-picker
    setFileName('example_cv.pdf');
  };

  // Templates for CV
  const templates = [
    { id: '1', name: 'Professional', color: COLORS.primary },
    { id: '2', name: 'Creative', color: COLORS.accent },
    { id: '3', name: 'Modern', color: COLORS.darkBlue }
  ];

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />
                <Text style={styles.subtitle}>CV Builder</Text>
              </View>
            </View>
      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Personal Information</Text>
        
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                value={personalInfo.name}
                onChangeText={(text) => setPersonalInfo({...personalInfo, name: text})}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Professional Title</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="briefcase-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="e.g. Software Engineer"
                value={personalInfo.title}
                onChangeText={(text) => setPersonalInfo({...personalInfo, title: text})}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={personalInfo.email}
                onChangeText={(text) => setPersonalInfo({...personalInfo, email: text})}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Phone</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="call-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                value={personalInfo.phone}
                onChangeText={(text) => setPersonalInfo({...personalInfo, phone: text})}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Professional Summary</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Write a short professional summary"
              value={personalInfo.summary}
              onChangeText={(text) => setPersonalInfo({...personalInfo, summary: text})}
              multiline={true}
              numberOfLines={4}
            />
          </View>
        </View>
        
        <Text style={[styles.subtitle, {marginTop: 20}]}>Skills</Text>
        
        <View style={styles.card}>
          <View style={styles.skillsList}>
            {skills.map((skill, index) => (
              <View key={index} style={styles.skillTag}>
                <Text style={styles.skillTagText}>{skill}</Text>
                <TouchableOpacity onPress={() => removeSkill(index)}>
                  <Ionicons name="close-circle" size={18} color={COLORS.white} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          
          <View style={styles.addSkillContainer}>
            <View style={[styles.inputWrapper, {flex: 1}]}>
              <TextInput
                style={styles.input}
                placeholder="Add a skill"
                value={newSkill}
                onChangeText={setNewSkill}
              />
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addSkill}>
              <Ionicons name="add" size={24} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        </View>
        
        <Text style={[styles.subtitle, {marginTop: 20}]}>Choose a Template</Text>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.templateScroll}>
          {templates.map(template => (
            <TouchableOpacity key={template.id} style={styles.templateCard}>
              <View style={[styles.templatePreview, {backgroundColor: template.color}]} />
              <Text style={styles.templateName}>{template.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        
        <TouchableOpacity style={[styles.button, {marginVertical: 20}]}>
          <Text style={styles.buttonText}>Generate CV</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={pickFile}
        >
          <Text style={styles.secondaryButtonText}>
            {fileName ? `Selected: ${fileName}` : 'Upload Existing CV'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Analysis Screen ---
function AnalysisScreen() {
  // Replace with actual data from API
  const matchScore = 90;
  const missing = ['Project Management', 'Python', 'SEO'];
  const enhancements = ['Tailor experience to project-based roles'];

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />
                <Text style={styles.subtitle}>Analysis</Text>
              </View>
            </View>
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
              <Ionicons name="arrow-up-circle" size={20} color={COLORS.primary} />
              <Text style={styles.skillText}>{e}</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- Courses Screen ---
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
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />
          <Text style={styles.subtitle}>Career Domains</Text>
        </View>
      </View>
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
                <Ionicons name={item.icon} size={40} color={COLORS.white} />
              </View>
              <Text style={styles.domainTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

// --- Domain Skills Screen ---
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

  // API URL for the FastAPI server
  const API_URL = 'http://localhost:8000/api/skills';
  
  // Function to check if the API server is running
  const checkAPIStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/health', {
        method: 'GET',
      });
      return response.ok;
    } catch (err) {
      console.error('API server health check failed:', err);
      return false;
    }
  };

  // Function to determine skill level based on position
  const determineSkillLevel = (index) => {
    if (index < 3) return 'Essential';
    if (index < 6) return 'Recommended';
    if (index < 8) return 'Valuable';
    return 'Emerging';
  };

  // Function to fetch skills from API
  const fetchSkills = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Check if API server is running
      const isServerRunning = await checkAPIStatus();
      if (!isServerRunning) {
        throw new Error('API server is not running. Please start the server using the start.bat file.');
      }
      
      // Map domain IDs to job titles for API
      const jobTitles = {
        '1': 'Software Developer',
        '2': 'Data Scientist',
        '3': 'UI UX Designer',
        '4': 'Digital Marketing Specialist',
        '5': 'Project Manager',
        '6': 'Cybersecurity Engineer'
      };
      
      const jobTitle = jobTitles[domain.id];
      
      console.log(`Fetching skills for ${jobTitle}...`);
      
      try {
        // Make API call to your Python server with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ job_title: jobTitle }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API response:', data);
        
        // Transform the bullet points into our skills format
        if (data.response && Array.isArray(data.response)) {
          const updatedSkills = data.response.map((skill, index) => ({
            id: String(index + 1),
            name: skill,
            level: determineSkillLevel(index),
          }));
          
          // Update the state with the new skills
          setSkillsData(prevData => ({
            ...prevData,
            [domain.id]: updatedSkills,
          }));
          
          setLastUpdated(new Date().toLocaleString());
        } else {
          throw new Error('Invalid response format from API');
        }
      } catch (fetchError) {
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. The server took too long to respond.');
        }
        throw fetchError;
      }
    } catch (err) {
      console.error('Error fetching skills:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
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

  const getLevelColor = (level) => {
    switch (level) {
      case 'Essential': return 'linear-gradient(135deg, #0a8528, #4CAF50)';  // Green gradient
      case 'Recommended': return 'linear-gradient(135deg, #0077B5, #00a0dc)'; // Blue gradient
      case 'Valuable': return 'linear-gradient(135deg, #f5a623, #FFB74D)';   // Orange gradient
      case 'Emerging': return 'linear-gradient(135deg, #00a0dc, #81D4FA)';   // Light blue gradient
      default: return COLORS.gray;
    }
  };
  
  // Extract solid color from gradient for React Native (which doesn't support gradients directly)
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

// --- Skill Resources Screen ---
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
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>{skill.name}</Text>
        </View>
        <View style={{width: 24}}></View>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Courses' && styles.activeTab]}
          onPress={() => setActiveTab('Courses')}
        >
          <Ionicons 
            name="book-outline" 
            size={20} 
            color={activeTab === 'Courses' ? COLORS.primary : COLORS.gray} 
          />
          <Text 
            style={[styles.tabText, activeTab === 'Courses' && styles.activeTabText]}
          >
            Courses
          </Text>
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
          <Text 
            style={[styles.tabText, activeTab === 'Websites' && styles.activeTabText]}
          >
            Websites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'Books' && styles.activeTab]}
          onPress={() => setActiveTab('Books')}
        >
          <Ionicons 
            name="library-outline" 
            size={20} 
            color={activeTab === 'Books' ? COLORS.primary : COLORS.gray} 
          />
          <Text 
            style={[styles.tabText, activeTab === 'Books' && styles.activeTabText]}
          >
            Books
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.resourceHeader}>
          <Text style={styles.subtitle}>Resources to learn {skill.name}</Text>
          
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => fetchResources(activeTab)}
          >
            <Ionicons 
              name={isSearching ? "refresh-circle" : "refresh"} 
              size={24} 
              color={COLORS.primary}
              style={isSearching ? {opacity: 0.5} : {}}
            />
          </TouchableOpacity>
        </View>
        
        {/* Skill information card */}
        <View style={styles.skillInfoCard}>
          <Ionicons 
            name={getSolidColor(skill.level) === '#0a8528' ? 'trending-up' : 'stats-chart'} 
            size={20} 
            color={getSolidColor(skill.level)} 
          />
          <Text style={styles.skillInfoText}>
            This skill is <Text style={{fontWeight: 'bold', color: getSolidColor(skill.level)}}>{skill.level.toLowerCase()}</Text> for a successful career in {domain.title}.
          </Text>
        </View>
        
        {isSearching ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>Finding the best {activeTab.toLowerCase()} for {skill.name}...</Text>
            <Text style={styles.loadingSubText}>This may take a moment</Text>
          </View>
        ) : (
          <>
            {activeTab === 'Courses' && (
              <FlatList
                data={resources.Courses}
                keyExtractor={item => item.id}
                renderItem={renderCourseItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Ionicons name="school-outline" size={64} color={COLORS.lightGray} />
                    <Text style={styles.emptyStateText}>No courses found for {skill.name}</Text>
                    <TouchableOpacity 
                      style={styles.retryButton}
                      onPress={() => fetchResources('Courses')}
                    >
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            )}
            
            {activeTab === 'Websites' && (
              <FlatList
                data={resources.Websites}
                keyExtractor={item => item.id}
                renderItem={renderWebsiteItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Ionicons name="globe-outline" size={64} color={COLORS.lightGray} />
                    <Text style={styles.emptyStateText}>No websites found for {skill.name}</Text>
                    <TouchableOpacity 
                      style={styles.retryButton}
                      onPress={() => fetchResources('Websites')}
                    >
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            )}
            
            {activeTab === 'Books' && (
              <FlatList
                data={resources.Books}
                keyExtractor={item => item.id}
                renderItem={renderBookItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
                ListEmptyComponent={
                  <View style={styles.emptyState}>
                    <Ionicons name="book-outline" size={64} color={COLORS.lightGray} />
                    <Text style={styles.emptyStateText}>No books found for {skill.name}</Text>
                    <TouchableOpacity 
                      style={styles.retryButton}
                      onPress={() => fetchResources('Books')}
                    >
                      <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            )}
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

// --- Profile Screen ---
function ProfileScreen() {
  const { user, logout } = useAuth(); // Use useAuth hook

  // Handle case where user might be null briefly during logout transition
  if (!user) {
    return (
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />
                <Text style={styles.subtitle}>Profile</Text>
              </View>
            </View>
            <View style={[styles.content, styles.centerContent]}>
              <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
          </SafeAreaView>
    );
  }

    return (          <SafeAreaView style={styles.container}>        <View style={styles.header}>          <View style={styles.logoContainer}>            <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.logoImage} />            <Text style={styles.subtitle}>Profile</Text>          </View>        </View>        <ScrollView style={styles.content}>
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
            <Ionicons name="settings-outline" size={24} color={COLORS.primary} style={styles.profileMenuItemIcon} />
            <Text style={styles.profileMenuItemText}>Settings</Text>
            <Ionicons name="chevron-forward-outline" size={22} color={COLORS.gray} />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity style={styles.profileMenuItem} onPress={() => {/* TODO: Navigate to Help */}}>
            <Ionicons name="help-circle-outline" size={24} color={COLORS.primary} style={styles.profileMenuItemIcon} />
            <Text style={styles.profileMenuItemText}>Help & Support</Text>
            <Ionicons name="chevron-forward-outline" size={22} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity 
          style={[styles.button, styles.signOutButton]}
          onPress={logout} // Use logout from useAuth
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Authentication Screens ---
function UserTypeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <View style={styles.loginLogoContainer}>
                <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.loginLogoImage} />
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
            <Ionicons name="briefcase-outline" size={48} color={COLORS.primary} />
          </View>
          <Text style={styles.userTypeTitle}>Career Development</Text>
          <Text style={styles.userTypeDesc}>Analyze your CV, get skill recommendations, and discover relevant courses</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function LoginScreen({ route, navigation }) {
  const { userType } = route.params;
  const [email, setEmail] = useState('test@example.com'); // Pre-filled for development
  const [password, setPassword] = useState('Password123'); // Pre-filled for development
  const [errorMsg, setErrorMsg] = useState('');
  const { login, isLoading } = useAuth();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setErrorMsg('');
    // Validation
    if (!email) {
      setErrorMsg('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }
    
    // Attempt login
    login(email, password, userType);
  };

    return (    <SafeAreaView style={styles.container}>      <View style={styles.header}>        <View style={styles.loginLogoContainer}>          <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.loginLogoImage} />        </View>      </View>      <ScrollView contentContainerStyle={styles.formContainer}>        <Text style={styles.heading}>Sign In</Text>        <Text style={styles.formSubtitle}>Sign in to continue</Text>
        
        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={COLORS.error} />
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          disabled={isLoading}
          onPress={handleLogin}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.textLink}
          onPress={() => navigation.navigate('Register', { userType })}
        >
          <Text style={styles.textLinkText}>Don't have an account? <Text style={styles.textLinkBold}>Sign Up</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function RegisterScreen({ route, navigation }) {
  const { userType } = route.params;
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('Password123');
  const [confirmPassword, setConfirmPassword] = useState('Password123');
  const [errorMsg, setErrorMsg] = useState('');
  const { register, isLoading } = useAuth();

  // Email validation regex
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    setErrorMsg('');
    // Validation
    if (!name) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!email) {
      setErrorMsg('Please enter your email');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter a password');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }
    
    // Attempt registration
    register(name, email, password, userType);
  };

  return (
    <SafeAreaView style={styles.container}>
            <View style={styles.header}>        <View style={styles.loginLogoContainer}>          <Image source={require('./Images/cAREERbOOSTER.png')} style={styles.loginLogoImage} />        </View>      </View>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.heading}>Create Account</Text>
        <Text style={styles.formSubtitle}>Sign up to get started</Text>
        
        {errorMsg ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle" size={20} color={COLORS.error} />
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : null}
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Full Name</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="person-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your full name"
              value={name}
              onChangeText={setName}
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="mail-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.gray} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          disabled={isLoading}
          onPress={handleRegister}
          activeOpacity={0.8}
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.white} size="small" />
          ) : (
            <Text style={styles.buttonText}>Create Account</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.textLink}
          onPress={() => navigation.navigate('Login', { userType })}
        >
          <Text style={styles.textLinkText}>Already have an account? <Text style={styles.textLinkBold}>Login</Text></Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Consumer Tab Navigator ---
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

// --- Consumer Stack Navigator ---
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

// --- Authentication Stack Navigator ---
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="UserType" component={UserTypeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} initialParams={{ userType: 'consumer' }} />
      <Stack.Screen name="Register" component={RegisterScreen} initialParams={{ userType: 'consumer' }} />
    </Stack.Navigator>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: COLORS.lightGray 
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    height: 70,
  },
  backButton: {
    padding: 4,
  },
  logo: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  heading: { 
    fontSize: 26, 
    fontWeight: '700', 
    marginBottom: 24,
    color: COLORS.darkBlue,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: COLORS.darkBlue
  },
  paragraph: { 
    fontSize: 16, 
    marginBottom: 24,
    color: COLORS.darkGray,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  // Enhanced Auth styles
  userTypeCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
    width: '100%',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
  },
  userTypeIconContainer: {
    backgroundColor: COLORS.lightBlue,
    borderRadius: 50,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userTypeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 8,
  },
  userTypeDesc: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
  },
  // Enhanced Form Elements
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(233, 52, 69, 0.1)', // Light red background
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    color: COLORS.darkBlue,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    overflow: 'hidden',
  },
  inputIcon: {
    padding: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkGray,
    paddingVertical: 14,
    paddingRight: 12,
  },
  textArea: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    padding: 12,
    fontSize: 16,
    color: COLORS.darkGray,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    elevation: 1,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: COLORS.mediumGray,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  textLink: {
    marginTop: 24,
    alignSelf: 'center',
    padding: 8,
  },
  textLinkText: {
    color: COLORS.gray,
    fontSize: 16,
  },
  textLinkBold: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  // Keep other existing styles below
  // ... [rest of the existing styles remain unchanged] ...
  
  // Add these new styles for the upload functionality
  uploadBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 24,
    marginVertical: 20,
    alignItems: 'center',
    elevation: 2,
    width: '100%',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    height: 160,
    justifyContent: 'center',
  },
  uploadText: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 16,
  },
  scoreText: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  skillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  skillText: {
    fontSize: 16,
    marginLeft: 12,
    color: COLORS.darkGray,
  },
  courseCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  courseIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  courseInfo: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  courseProvider: {
    fontSize: 14,
    color: COLORS.gray,
  },
  viewButton: {
    backgroundColor: COLORS.lightBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  viewButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  dashboardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    elevation: 4,
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    height: 70,
  },
  headerProfileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.white,
  },
  analysisCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardActionButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginTop: 12,
    alignItems: 'center',
  },
  cardActionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  requestCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  requestInfo: {
    marginBottom: 12,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  requestProvider: {
    fontSize: 14,
    color: COLORS.gray,
  },
  requestDate: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  requestTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  actionNeeded: {
    backgroundColor: COLORS.warning,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  actionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '500',
  },
  requestDetailHeader: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  providerDetailImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  providerDetailName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  providerDetailRating: {
    fontSize: 16,
    color: COLORS.gray,
  },
  providerProfile: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  providerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  providerProfileName: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  providerRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerProfileRating: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  providerListCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  providerListInfo: {
    marginBottom: 12,
  },
  providerListName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  providerListServices: {
    fontSize: 14,
    color: COLORS.gray,
  },
  providerListMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  providerListRating: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginLeft: 8,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '500',
    color: COLORS.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.darkGray,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 6,
    marginLeft: 12,
  },
  consumerCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  consumerInfo: {
    marginBottom: 12,
  },
  consumerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  consumerEmail: {
    fontSize: 14,
    color: COLORS.gray,
  },
  consumerMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  consumerServices: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  consumerJoined: {
    fontSize: 14,
    color: COLORS.gray,
  },
  earningsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  earningsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 12,
  },
  earningsAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  paymentCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  paymentInfo: {
    marginBottom: 8,
  },
  paymentService: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  paymentConsumer: {
    fontSize: 14,
    color: COLORS.gray,
  },
  paymentDate: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  paymentAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  statCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  statBox: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  statBoxValue: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  statBoxLabel: {
    fontSize: 14,
    color: COLORS.gray,
  },
  dashboardActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  dashboardAction: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    marginRight: 8,
  },
  dashboardActionText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 8,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityText: {
    fontSize: 16,
    color: COLORS.darkBlue,
  },
  activityTime: {
    fontSize: 14,
    color: COLORS.gray,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  starIcon: {
    marginRight: 4,
  },
  categoryCard: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flex: 1,
    marginRight: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  providerImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  providerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
    marginBottom: 4,
  },
  providerRating: {
    fontSize: 14,
    color: COLORS.gray,
  },
  providerPrice: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  serviceDateContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 6,
    padding: 8,
    marginBottom: 12,
  },
  serviceMonth: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  serviceDay: {
    fontSize: 14,
    color: COLORS.gray,
  },
  serviceInfo: {
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.darkBlue,
  },
  serviceConsumer: {
    fontSize: 14,
    color: COLORS.gray,
  },
  servicePayment: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    elevation: 1,
    shadowColor: COLORS.cardShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonDisabled: {
    backgroundColor: COLORS.mediumGray,
    elevation: 0,
    shadowOpacity: 0,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  textArea: {
    backgroundColor: COLORS.inputBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.mediumGray,
    padding: 12,
    fontSize: 16,
    color: COLORS.darkGray,
    textAlignVertical: 'top',
    minHeight: 120,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.darkBlue,
  },
  detailValue: {
    fontSize: 14,
    color: COLORS.darkGray,
  },
    // Logo styles for all screens
    logoContainer: {
      flex: 0.8,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    logoImage: {
      width: 180,
      height: 40,
      resizeMode: 'contain',
    },
    // Special larger logo for login/register screens
    loginLogoContainer: {
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 40,
    },
    loginLogoImage: {
      width: 220,
      height: 55,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    formSubtitle: {
      fontSize: 16,
      color: COLORS.gray,
      marginBottom: 24,
      textAlign: 'center',
    },
    // Profile Screen specific styles
    profileCard: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: 20,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: COLORS.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    avatarCircle: {
      width: 80,
      height: 80,
      borderRadius: 40,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarText: {
      color: COLORS.white,
      fontSize: 32,
      fontWeight: 'bold',
    },
    profileNameText: {
      fontSize: 20,
      fontWeight: '600',
      color: COLORS.darkBlue,
      marginBottom: 4,
    },
    profileEmailText: {
      fontSize: 16,
      color: COLORS.gray,
      marginBottom: 8,
    },
    profileMenuCard: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      marginBottom: 20,
      shadowColor: COLORS.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      overflow: 'hidden', // Ensures border radius is respected by children
    },
    profileMenuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
    },
    profileMenuItemIcon: {
      marginRight: 16,
    },
    profileMenuItemText: {
      flex: 1,
      fontSize: 16,
      color: COLORS.darkGray,
    },
    menuDivider: {
      height: 1,
      backgroundColor: COLORS.borderColor,
      marginHorizontal: 20,
    },
    signOutButton: {
      backgroundColor: COLORS.error, // Using error color for sign out
      marginTop: 10,
      marginBottom: 20, // Add some bottom margin
    },
    // New styles for the CV Builder
    skillsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 16,
    },
    skillTag: {
      backgroundColor: COLORS.primary,
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      margin: 4,
      flexDirection: 'row',
      alignItems: 'center',
    },
    skillTagText: {
      color: COLORS.white,
      marginRight: 8,
      fontSize: 14,
    },
    addSkillContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    templateScroll: {
      marginVertical: 16,
    },
    templateCard: {
      width: 160,
      marginRight: 16,
      alignItems: 'center',
    },
    templatePreview: {
      width: 140,
      height: 180,
      borderRadius: 8,
      marginBottom: 8,
    },
    templateName: {
      fontSize: 16,
      fontWeight: '500',
      color: COLORS.darkBlue,
    },
    secondaryButton: {
      backgroundColor: COLORS.white,
      borderWidth: 1,
      borderColor: COLORS.primary,
      marginTop: 0,
      marginBottom: 40,
    },
    secondaryButtonText: {
      color: COLORS.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    domainCard: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      width: '48%',
      alignItems: 'center',
      shadowColor: COLORS.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    domainIconContainer: {
      width: 70,
      height: 70,
      borderRadius: 35,
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 12,
    },
    domainTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.darkBlue,
      textAlign: 'center',
    },
    // Styles for DomainSkills screen
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    lastUpdatedText: {
      fontSize: 12,
      color: COLORS.gray,
      fontStyle: 'italic',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
    },
    loadingText: {
      fontSize: 16,
      color: COLORS.darkGray,
      marginTop: 16,
    },
    loadingSubText: {
      fontSize: 14,
      color: COLORS.gray,
      marginTop: 8,
      fontStyle: 'italic',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 50,
    },
    errorText: {
      fontSize: 16,
      color: COLORS.error,
      marginTop: 16,
      textAlign: 'center',
      marginHorizontal: 20,
    },
    updateButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
      alignSelf: 'flex-start',
      marginBottom: 16,
    },
    updateButtonText: {
      color: COLORS.white,
      marginLeft: 8,
      fontSize: 14,
      fontWeight: '500',
    },
    enhancedSkillCard: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
      shadowColor: COLORS.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    skillIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    skillInfo: {
      flex: 1,
    },
    skillTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.darkBlue,
      marginBottom: 4,
    },
    levelBadge: {
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    levelText: {
      color: COLORS.white,
      fontSize: 12,
      fontWeight: '500',
    },
    arrowContainer: {
      padding: 4,
    },
    refreshButton: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },
    // Styles for SkillResources screen
    tabContainer: {
      flexDirection: 'row',
      backgroundColor: COLORS.white,
      paddingVertical: 4,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.borderColor,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: 12,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: COLORS.primary,
    },
    tabText: {
      fontSize: 14,
      color: COLORS.gray,
      marginLeft: 4,
    },
    activeTabText: {
      color: COLORS.primary,
      fontWeight: '500',
    },
    resourceHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    skillInfoCard: {
      backgroundColor: 'rgba(0, 119, 181, 0.1)',
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    skillInfoText: {
      fontSize: 14,
      color: COLORS.darkGray,
      marginLeft: 8,
      flex: 1,
    },
    enhancedResourceCard: {
      backgroundColor: COLORS.white,
      borderRadius: 10,
      padding: 16,
      marginBottom: 16,
      shadowColor: COLORS.cardShadow,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    resourceCardHeader: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    resourceInfo: {
      flex: 1,
    },
    resourceTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.darkBlue,
      marginBottom: 4,
    },
    resourceDescription: {
      fontSize: 14,
      color: COLORS.darkGray,
      marginBottom: 6,
    },
    resourceAuthor: {
      fontSize: 14,
      color: COLORS.gray,
      marginBottom: 6,
    },
    resourceMeta: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
      marginBottom: 4,
    },
    ratingText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    difficultyContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
      marginBottom: 4,
    },
    difficultyText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    durationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    durationText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    typeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
      marginBottom: 4,
    },
    typeText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    updateContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    updateText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    publisherContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
      marginBottom: 4,
    },
    publisherText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    pagesContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    pagesText: {
      fontSize: 13,
      color: COLORS.darkGray,
      marginLeft: 4,
    },
    resourceCardFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: COLORS.borderColor,
    },
    resourcePrice: {
      fontSize: 16,
      fontWeight: '600',
      color: COLORS.darkBlue,
    },
    resourceUrl: {
      fontSize: 14,
      color: COLORS.gray,
      width: '50%',
    },
    enhancedEnrollButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    enrollText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
    },
    enhancedVisitButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    visitText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
    },
    enhancedBuyButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 6,
      flexDirection: 'row',
      alignItems: 'center',
    },
    buyText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
    },
    emptyStateText: {
      fontSize: 16,
      color: COLORS.gray,
      marginTop: 16,
      marginBottom: 16,
    },
    retryButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 6,
    },
    retryButtonText: {
      color: COLORS.white,
      fontSize: 14,
      fontWeight: '500',
    },
    listContainer: {
      paddingBottom: 20,
    },
  });

// Root Navigator that checks auth state
function RootNavigator() {
  const { user, isLoading } = useAuth();
  
  // Add error handling
  const [hasError, setHasError] = useState(false);
  
  React.useEffect(() => {
    // For React Native, a global error handler like this is less common.
    // Error Boundaries or dev client typically handle errors.
    // This is more for web.
    const handleError = (error, errorInfo) => {
      console.error('App Error:', error, errorInfo);
      setHasError(true);
    };
    
    // A more React-centric way would be an ErrorBoundary component wrapping RootNavigator
    // For simplicity, we'll keep the state-based one for now.
    // Note: window.addEventListener is for browser environments.
    // In React Native, this won't catch React rendering errors effectively.
    // const originalErrorHandler = ErrorUtils.getGlobalHandler();
    // ErrorUtils.setGlobalHandler(handleError);
    // return () => ErrorUtils.setGlobalHandler(originalErrorHandler);
  }, []);
  
  if (hasError) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={{color: COLORS.error, fontSize: 18, marginBottom: 20}}>
          Something went wrong!
        </Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => setHasError(false)}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <Stack.Screen name="ConsumerRoot" component={ConsumerStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}

// Main App Component with Auth State
export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
        <RootNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}


