import React, { useState } from 'react';
import ig1 from '../../images/ig1.jpg';
import ig2 from '../../images/ig2.jpeg';
import ig3 from '../../images/ig3.jpg';
import { FlatList, Image, Text, View, StyleSheet, Button } from 'react-native';

const images = [
  { id: '1', src: ig1, description: 'Descripción de la imagen 1' },
  { id: '2', src: ig2, description: 'Descripción de la imagen 2' },
  { id: '3', src: ig3, description: 'Descripción de la imagen 3' },
];

export default function ExploreScreen() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const renderItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image source={images[currentImageIndex].src} style={styles.image} resizeMode="cover" />
      <Text style={styles.description}>{images[currentImageIndex].description}</Text>
      <Button title="Cambiar Imagen" onPress={changeImage} />
    </View>
  );

  const changeImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <FlatList
      data={[images[currentImageIndex]]}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.gallery}
    />
  );
}

const styles = StyleSheet.create({
  gallery: {
    padding: 16,
    marginTop: 60,
  },
  imageContainer: {
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#f0f0f0', 
  },
  image: {
    width: '100%',
    height: 200, 
  },
  description: {
    padding: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
});