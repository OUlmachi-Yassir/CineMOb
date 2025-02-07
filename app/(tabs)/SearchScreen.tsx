import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilmDetails'>;

const SearchPage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation<SearchScreenNavigationProp>();

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

  const filteredFilms = films.filter(film =>
    film.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFilm = ({ item }: { item: Film }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FilmDetails', { film: item })}>
      <Image source={{ uri: `http://192.168.1.9:3000/${item.image}` }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un film..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredFilms}
        renderItem={renderFilm}
        keyExtractor={(item) => item._id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#DCDCDC",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#fff',
  },
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 8,
  },
  title: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default SearchPage;
