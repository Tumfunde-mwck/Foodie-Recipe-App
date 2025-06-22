import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function RecipeCard({ recipe, onPress, favorites, setFavorites }) {
  const isFav = favorites.some(f => f.id === recipe.id);

  const toggleFav = () => {
    if (isFav) {
      setFavorites(favorites.filter(f => f.id !== recipe.id));
    } else {
      setFavorites([...favorites, recipe]);
    }
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      {/* Recipe Image */}
      <Image
        source={recipe.image ? { uri: recipe.image } : require('../assets/icon.png')}
        style={styles.image}
      />

      {/* Name and Heart */}
      <View style={styles.headerRow}>
        <Text style={styles.name}>{recipe.name}</Text>
        <AntDesign
          name={isFav ? 'heart' : 'hearto'}
          size={20}
          color={isFav ? 'red' : 'black'}
          onPress={toggleFav}
        />
      </View>

      {/* Optional badges */}
      <View style={styles.badgeRow}>
        {recipe.time ? (
          <Text style={styles.badge}>⏱ {recipe.time}</Text>
        ) : null}
        {recipe.difficulty ? (
          <Text style={styles.badge}>🎯 {recipe.difficulty}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    margin: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 6,
    gap: 10,
  },
  badge: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 12,
    color: '#333',
    marginRight: 8,
  },
});
