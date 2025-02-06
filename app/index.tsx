import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, ActivityIndicator } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import RootStackParamList from './types';
import StyledTitle from '@/components/TitleLogo';

export default function Index() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const images = [
    require('../assets/images/dark-phoenix.webp'),
    require('../assets/images/death-of-dick-long.webp'),
    require('../assets/images/HD-wallpaper-solo-leveling-igris-solo-leveling-manhwa.jpg'),
    require('../assets/images/lady_in_the_water_ver2_xlg.jpg'),
  ];

  const [backgroundImage, setBackgroundImage] = useState<any>(images[0]);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler un chargement de 3 secondes
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setBackgroundImage((prevImage: any) => {
          const currentIndex = images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#e50914" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Écran noir de fond pour éviter les flashs blancs */}
      <View style={styles.blackScreen} />

      <Animated.View style={[styles.backgroundWrapper, { opacity: fadeAnim }]}>
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageStyle} />
      </Animated.View>

      <View style={styles.overlay}>
        <StyledTitle />
        <Text style={styles.text}>Get started to see our new Movies!</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('login')}
        >
          <Text style={styles.buttonText}>Next!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
  },
  backgroundWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  imageStyle: {
    resizeMode: 'cover',
    
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent:'center',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 10,
    margin: 10, 
  },
  title: {
    fontSize: 70,
    textAlign: 'left', 
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textShadowColor: '#482896',
    textShadowOffset: { width: 5, height: 5 },
    textShadowRadius: 10,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Arial',
    lineHeight: 24,
    textAlign: 'left', 
    letterSpacing: 0.5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginBottom: 20,
    width: 150,
    marginRight: 50,
    shadowColor: '#AA0000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
