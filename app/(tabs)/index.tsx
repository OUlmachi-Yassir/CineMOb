import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
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
        const response = await fetch('http://192.168.1.9:3000/api/films');
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
      <Image source={{ uri: `http://192.168.1.9:3000/${item.image}` }} style={styles.image} />
    </TouchableOpacity>
  );

  const filterByGenre = (genre: string) => {
    return films.filter(film => film.genre === genre);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Carousel of first 4 films */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {films.slice(0, 4).map((film) => (
          <TouchableOpacity key={film._id} onPress={() => navigation.navigate('FilmDetails', { film })}>
            <Image source={{ uri: `http://192.168.1.9:3000/${film.image}` }} style={styles.carouselImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Genres */}
      {['Horror', 'Romantic', 'science-fiction', 'Action'].map((genre) => (
        <View key={genre} style={styles.genreSection}>
          <Text style={styles.genreTitle}>{genre}</Text>
          <FlatList
            data={filterByGenre(genre)}
            renderItem={renderFilm}
            keyExtractor={(item) => item._id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', 
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  carouselImage: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 8,
   
  },
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 8,
    shadowColor: 'red',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1, 
    shadowRadius: 10, 
    elevation: 10, //
  },
  genreSection: {
    marginVertical: 20,
  },
  genreTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff',
  },
});

export default HomePage;
