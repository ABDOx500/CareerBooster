import React, { useState, useContext, createContext } from 'react';
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
  const matchScore = 90;
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
          <Text style={styles.logo}>CareerBooster</Text>
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
        
        <TouchableOpacity 
          style={[styles.button, {marginVertical: 20}]} 
          onPress={() => navigation.navigate('Career')}
        >
          <Text style={styles.buttonText}>Upload a New CV</Text>
        </TouchableOpacity>
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
          <Text style={styles.logo}>Upload CV</Text>
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
          <Text style={styles.logo}>Analysis</Text>
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
function CoursesScreen() {
  // Replace with real data
  const data = [
    { id: '1', title: 'Project Management Fundamentals', provider: 'Coursera', rating: 4.8 },
    { id: '2', title: 'Python for Data Science', provider: 'DataCamp', rating: 4.7 },
    { id: '3', title: 'Intro to SEO', provider: 'Udemy', rating: 4.5 }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Courses</Text>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.subtitle}>Recommended for you</Text>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.courseCard}>
              <View style={styles.courseIconContainer}>
                <Ionicons name="book-outline" size={30} color={COLORS.white} />
              </View>
              <View style={styles.courseInfo}>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text style={styles.courseProvider}>{item.provider} • {item.rating}★</Text>
              </View>
              <TouchableOpacity style={styles.viewButton}>
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        />
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
            <Text style={styles.logo}>Profile</Text>
          </View>
        </View>
        <View style={[styles.content, styles.centerContent]}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>Profile</Text>
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
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>CareerBooster</Text>
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
        <Text style={styles.formSubtitle}>Sign in to continue</Text>
        
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
      <View style={styles.header}>
        <View style={styles.loginLogoContainer}>
          <Text style={[styles.logo, {fontSize: 28}]}>CareerBooster</Text>
        </View>
      </View>
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
            iconName = focused ? 'briefcase' : 'briefcase-outline';
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
      <Tab.Screen name="Career" component={UploadScreen} />
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
      {/* Add other screens accessible post-login and not in tabs, e.g., detail screens */}
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
  },
  backButton: {
    padding: 4,
  },
  logo: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
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
  },
  headerProfileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Special larger logo for login/register screens
  loginLogoContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
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


