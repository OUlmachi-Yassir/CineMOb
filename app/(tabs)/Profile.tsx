import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import axios from 'axios';
import RootStackParamList from '../types';

const ProfileScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Charger les informations de l'utilisateur
  useEffect(() => {
    const fetchUserInfo = async () => {
        const storedUserId = await AsyncStorage.getItem('userId');
        const token = await AsyncStorage.getItem('token'); // Assurez-vous que le token est récupéré
      
        console.log('storedUserId:', storedUserId); // Log pour vérifier
      
        if (storedUserId && token) {
          setUserId(storedUserId);
          try {
            const response = await axios.get('http://192.168.1.9:3000/api/auth/profile', {
              headers: {
                Authorization: `Bearer ${token}`, // Envoyer le token dans l'en-tête
              },
            });
            console.log('User Info:', response.data); // Log de la réponse API
            setUserInfo(response.data);
          } catch (error) {
            console.error('Erreur lors de la récupération des informations de l\'utilisateur:', error);
          }
        } else {
          console.log('ID ou token manquant');
        }
      };
    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('token');
      Alert.alert('Succès', 'Vous êtes déconnecté');
      navigation.navigate('login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <View style={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.title}>Profil de {userInfo.name}</Text>
          <Text style={styles.detail}>Email: {userInfo.email}</Text>
          <Text style={styles.detail}>Nom: {userInfo.name}</Text>
        </>
      ) : (
        <Text style={styles.loading}>Chargement des informations...</Text>
      )}

      <Button title="Déconnexion" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 5,
  },
  loading: {
    fontSize: 18,
    color: '#aaa',
  },
});

export default ProfileScreen;
