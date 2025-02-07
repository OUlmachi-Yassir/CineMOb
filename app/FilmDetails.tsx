import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, TextInput, FlatList, Button } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';  
import axios from 'axios'; 

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

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comments/${film._id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(
        'http://localhost:3000/api/comments/',
        { text: newComment, filmId: film._id },
        { headers: { Authorization: `Bearer TOKEN_HERE` } } 
      );

      setComments([response.data, ...comments]); 
      setNewComment(''); 
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: `http://localhost:3000/${film.image}` }} style={styles.image} />
      <Text style={styles.title}>{film.title}</Text>
      <Text style={styles.director}>Director: {film.director}</Text>
      <Text style={styles.releaseYear}>Year: {film.releaseYear}</Text>
      <Text style={styles.genre}>Genre: {film.genre}</Text>

      <TouchableOpacity style={styles.favoriteButton}>
        <Icon name="heart" size={30} color="#FF0000" />
      </TouchableOpacity>

      {/* Section Vidéo */}
      

      {/* Section Commentaires */}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Commentaires</Text>

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

        {/* Formulaire d'ajout de commentaire */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Ajouter un commentaire..."
            placeholderTextColor="#aaa"
            value={newComment}
            onChangeText={setNewComment}
          />
          <Button title="Envoyer" onPress={handleAddComment} color="#4CAF50" />
        </View>
      </View>
    </View>
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
  videoPlayer: {
    width: width - 40,
    height: 250,
    borderRadius: 8,
    marginTop: 20,
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
  commentContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  commentAuthor: {
    fontWeight: 'bold',
    color: '#fff',
  },
  commentText: {
    color: '#ccc',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default FilmDetailsScreen;
