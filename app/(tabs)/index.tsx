import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

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

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilmDetails'>;

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/films');
        const data = await response.json();
        setFilms(data);
      } catch (error) {
        console.error('Error fetching films:', error);
      }
    };

    fetchFilms();
  }, []);

  const renderFilm = ({ item }: { item: Film }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FilmDetails', { film: item })}>
      <Image source={{ uri: `http://localhost:3000/${item.image}` }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={films}
        renderItem={renderFilm}
        keyExtractor={(item) => item._id}
        numColumns={2} // Affichage en grille
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafd',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 8,
  },
});

export default HomePage;
