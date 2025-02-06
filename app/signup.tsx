import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import  RootStackParamList from './types';

export default function Signup({}: any) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', "Passwords don't match");
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
  
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('login')}>
        <Text style={styles.link}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#141414' },  // Fond noir comme Netflix
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, color: '#fff' },  // Texte clair
  input: { 
    height: 50, 
    backgroundColor: '#333333',  // Gris foncé pour les champs de saisie
    borderRadius: 8, 
    paddingHorizontal: 15, 
    marginVertical: 10, 
    color: '#fff',  // Texte clair
  },
  button: { 
    backgroundColor: '#e50914',  // Rouge vif, couleur Netflix
    paddingVertical: 15, 
    borderRadius: 8, 
    marginTop: 20 
  },
  buttonText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  link: { marginTop: 15, color: '#e50914', textAlign: 'center' },  // Lien en rouge vif
});
