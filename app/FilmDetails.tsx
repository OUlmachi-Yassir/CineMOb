import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

interface Film {
  _id: string;
  title: string;
  director: string;
  releaseYear: number;
  genre: string;
  image: string;
  video: string;
}

type RootStackParamList = {
  FilmDetails: { film: Film };
};

const FilmDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'FilmDetails'>>();
  const { film } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: `http://localhost:3000/${film.image}` }} style={styles.image} />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.director}>Director: {film.director}</Text>
      <Text style={styles.releaseYear}>Year: {film.releaseYear}</Text>
      <Text style={styles.genre}>Genre: {film.genre}</Text>

      {film.video && (
        <TouchableOpacity onPress={() => {/* Ajoute une logique pour lire la vidéo */}}>
          <Text style={styles.playButton}>Play Video</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
  director: {
    fontSize: 18,
    marginTop: 5,
  },
  releaseYear: {
    fontSize: 18,
    marginTop: 5,
  },
  genre: {
    fontSize: 18,
    marginTop: 5,
  },
  playButton: {
    fontSize: 18,
    color: '#007bff',
    marginTop: 10,
  },
});

export default FilmDetailsScreen;
