import React from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function MyRecipes({ navigation, recipes, setRecipes }) {
  const myRecipes = recipes.filter(r => r.category === 'My Recipes');

  const deleteRecipe = (id) => {
    setRecipes(recipes.filter(r => r.id !== id));
  };

  return (
    <FlatList
      data={myRecipes}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity onPress={() => navigation.navigate('Details', { recipe: item })}>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>

          <View style={styles.buttonRow}>
            <Button
              title="Edit"
              color="#007bff"
              onPress={() => navigation.navigate('Edit Recipe', { recipe: item })}
            />
            <Button
              title="Delete"
              color="red"
              onPress={() => deleteRecipe(item.id)}
            />
          </View>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f4f4f4',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
