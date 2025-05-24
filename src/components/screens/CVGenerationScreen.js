import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/styles';

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
    { id: '1', name: 'Professional', color: '#0077B5' },
    { id: '2', name: 'Creative', color: '#00a0dc' },
    { id: '3', name: 'Modern', color: '#004c75' }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image source={require('../../../Images/cAREERbOOSTER.png')} style={styles.logoImage} />
          <Text style={styles.subtitle}>CV Builder</Text>
        </View>
      </View>
      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>Personal Information</Text>
        
        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Ionicons name="person-outline" size={20} color="#86888A" style={styles.inputIcon} />
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
              <Ionicons name="briefcase-outline" size={20} color="#86888A" style={styles.inputIcon} />
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
              <Ionicons name="mail-outline" size={20} color="#86888A" style={styles.inputIcon} />
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
              <Ionicons name="call-outline" size={20} color="#86888A" style={styles.inputIcon} />
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
                  <Ionicons name="close-circle" size={18} color="#FFFFFF" />
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
              <Ionicons name="add" size={24} color="#FFFFFF" />
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

export default CVGenerationScreen; 