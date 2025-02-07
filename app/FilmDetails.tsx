import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, FlatList, Button, Alert } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { ScrollView } from 'react-native';
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

interface Comment {
  _id: string;
  text: string;
  Client: { name: string };
  createdAt: string;
}

type RootStackParamList = {
  FilmDetails: { film: Film };
};

const { width } = Dimensions.get('window');

const FilmDetailsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'FilmDetails'>>();
  const { film } = route.params;

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
    getUserId();
    checkIfFavorite(); 
  }, []);

  const getUserId = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      console.log('Retrieved User ID:', storedUserId);
      setUserId(storedUserId);
    } catch (error) {
      console.error('Error retrieving user ID:', error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://192.168.1.9:3000/api/comments/${film._id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const checkIfFavorite = async () => {
    try {
      if (!userId) return;
      const response = await axios.get(
        `http://192.168.1.9:3000/api/favorite/${film._id}/${userId}`
      );
      setIsFavorite(response.data.isFavorite);
      console.log(response.data.isFavorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleAddFavorite = async () => {
    if (!userId) {
      Alert.alert('Erreur', 'Vous devez être connecté pour ajouter aux favoris.');
      return;
    }

    try {
      const response = await axios.post(
        'http://192.168.1.9:3000/api/favorite/add',
        { filmId: film._id, userId },
      );

      if (response.status === 201) {
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleRemoveFavorite = async () => {
    if (!userId) return;

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(
        `http://192.168.1.9:3000/api/favorite/${film._id}/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.status === 200) {
        setIsFavorite(false);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const handleAddComment = async () => {
    if (!userId) {
      Alert.alert('Erreur', 'Vous devez être connecté pour commenter.');
      return;
    }

    if (!newComment.trim()) {
      Alert.alert('Erreur', 'Le commentaire ne peut pas être vide.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(
        'http://192.168.1.9:3000/api/comments/',
        { text: newComment, filmId: film._id, userId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments([response.data, ...comments]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: `http://192.168.1.9:3000/${film.image}` }} style={styles.image} />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.director}>Réalisateur: {film.director}</Text>
      <Text style={styles.releaseYear}>Année: {film.releaseYear}</Text>
      <Text style={styles.genre}>Genre: {film.genre}</Text>

      {/* Favoris Button */}
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={isFavorite ? handleRemoveFavorite : handleAddFavorite}
      >
        <Icon name="heart" size={30} color={isFavorite ? '#FF0000' : '#fff'} />
      </TouchableOpacity>

      {/* Comments Section */}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Commentaires</Text>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Ajouter un commentaire..."
            placeholderTextColor="#aaa"
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button title="Envoyer" onPress={handleAddComment} color="red" />
        </View>

        <FlatList
          data={comments}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>{item.Client.name} :</Text>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
    padding: 20,
  },
  image: {
    width: width - 40,
    height: 400,
    borderRadius: 8,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  director: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 5,
  },
  releaseYear: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 5,
  },
  genre: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 15,
  },
  favoriteButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  commentSection: {
    marginTop: 20,
    backgroundColor: '#1E1E1E',
    padding: 15,
    borderRadius: 8,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  commentInputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    paddingLeft: 10,
    color: '#fff',
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#fff',
  },
  commentText: {
    color: '#ccc',
  },
});

export default FilmDetailsScreen;
