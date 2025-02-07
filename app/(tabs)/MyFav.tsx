import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, TouchableOpacity, Text, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

type FavoriteScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FilmDetails'>;

const FavoritePage = () => {
  const [favorites, setFavorites] = useState<Film[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const navigation = useNavigation<FavoriteScreenNavigationProp>();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId'); // 
        setUserId(id);
      } catch (error) {
        console.error('Error fetching userId from AsyncStorage:', error);
      }
    };

    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchFavorites = async () => {
        try {
          const response = await fetch(`http://192.168.1.9:3000/api/favorite/${userId}`);
          const data = await response.json();
          setFavorites(data.favorites.map((fav: any) => fav.film));
        } catch (error) {
          console.error('Error fetching favorites:', error);
        }
      };

      fetchFavorites();
    }
  }, [userId]);

  const renderFilm = ({ item }: { item: Film }) => (
    <TouchableOpacity onPress={() => navigation.navigate('FilmDetails', { film: item })}>
      <Image source={{ uri: `http://192.168.1.9:3000/${item.image}` }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Favorite Films</Text>
      {favorites.length === 0 ? (
        <Text style={styles.noFavoritesMessage}>You don't have favorite movies yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          renderItem={renderFilm}
          keyExtractor={(item) => item._id}
          numColumns={2}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 200,
    margin: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 5,
  },
  noFavoritesMessage: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritePage;
