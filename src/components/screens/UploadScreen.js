import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../../styles/styles';
import AppHeader from '../ui/AppHeader';

function UploadScreen() {
  const [fileName, setFileName] = useState('');
  const [url, setUrl] = useState('');

  const pickFile = () => {
    // TODO: integrate react-native-document-picker
    setFileName('example_cv.pdf');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader 
        showSearch={false} 
        title="CV Analysis" 
        showBackButton={true}
      />
      <View style={styles.content}>
        <TouchableOpacity style={styles.uploadBox} onPress={pickFile}>
          <Ionicons name="cloud-upload-outline" size={48} color="#0077B5" />
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

export default UploadScreen; 