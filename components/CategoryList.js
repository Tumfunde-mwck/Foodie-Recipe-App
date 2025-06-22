import React, { useState } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CATEGORIES, RECIPE_DATA } from '../data/dummyData';
import RecipeCard from './RecipeCard';

// Category icons
const categoryIcons = {
  All: require('../assets/foods.jpeg'),
  'My Food': require('../assets/foods.jpeg'),
  'My Favorites': require('../assets/foods.jpeg'),
  Beef: require('../assets/foods.jpeg'),
  Chicken: require('../assets/foods.jpeg'),
  Dessert: require('../assets/foods.jpeg'),
  Lamb: require('../assets/foods.jpeg'),
  Miscellaneous: require('../assets/foods.jpeg'),
};

export default function CategoryList({ navigation, recipes, setRecipes, favorites, setFavorites }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredRecipes =
    selectedCategory === 'All'
      ? [...RECIPE_DATA, ...recipes]
      : selectedCategory === 'My Favorites'
      ? favorites
      : selectedCategory === 'My Food'
      ? recipes
      : [...RECIPE_DATA, ...recipes].filter((r) => r.category === selectedCategory);

  return (
    <View style={styles.container}>
      {/* Heading */}
      <View style={styles.header}>
        <Text style={styles.title}>
          Make your own food, <Text style={styles.highlight}>stay at home</Text>
        </Text>
        <Text style={styles.userGreeting}>Hello, User!</Text>
      </View>

      {/* Category List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 10 }}>
        {['All', 'My Food', 'My Favorites', ...CATEGORIES, 'Miscellaneous'].map((cat) => (
          <TouchableOpacity
            key={cat}
            style={{ alignItems: 'center', marginRight: 12 }}
            onPress={() => setSelectedCategory(cat)}
          >
            <View
              style={[
                styles.categoryIconWrapper,
                selectedCategory === cat && { borderColor: 'green' },
              ]}
            >
              <Image
                source={categoryIcons[cat] || require('../assets/foods.jpeg')}
                style={styles.categoryImage}
              />
            </View>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
        {/* Add Recipe Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Add Recipe')}>
          <Text style={styles.addButton}>+ Add</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Recipe Cards */}
      {filteredRecipes.length > 0 ? (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <RecipeCard
              recipe={item}
              onPress={() => navigation.navigate('Details', { recipe: item })}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        />
      ) : (
        <Text style={styles.noRecipesText}>No recipes found for "{selectedCategory}"</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
  },
  highlight: {
    color: 'orange',
  },
  userGreeting: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  categoryIconWrapper: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 40,
    padding: 3,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
  },
  addButton: {
    margin: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
  noRecipesText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#888',
  },
});
