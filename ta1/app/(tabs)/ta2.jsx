import React, { useState } from 'react';
import firstImage from '../../images/ig1.jpg';
import secondImage from '../../images/ig2.jpeg';
import thirdImage from '../../images/ig3.jpg';
import { FlatList, Image, Text, View, StyleSheet, Button } from 'react-native';

const galleryImages = [
  { id: '1', source: firstImage, caption: 'Beautiful landscape view' },
  { id: '2', source: secondImage, caption: 'Urban architecture' },
  { id: '3', source: thirdImage, caption: 'Nature closeup' },
];

export default function GalleryScreen() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const renderGalleryItem = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image 
        source={galleryImages[activeImageIndex].source} 
        style={styles.image} 
        resizeMode="cover" 
      />
      <Text style={styles.description}>
        {galleryImages[activeImageIndex].caption}
      </Text>
      <Button 
        title="Next Image" 
        onPress={navigateToNextImage} 
      />
    </View>
  );

  const navigateToNextImage = () => {
    setActiveImageIndex((current) => (current + 1) % galleryImages.length);
  };

  return (
    <FlatList
      data={[galleryImages[activeImageIndex]]}
      renderItem={renderGalleryItem}
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
