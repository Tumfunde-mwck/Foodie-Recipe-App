import React from 'react';
import { View, Text, ScrollView, Image, Button, Alert, StyleSheet } from 'react-native';

export default function RecipeDetails({ route, navigation }) {
  const { recipe, recipes, setRecipes } = route.params;

  // Delete recipe logic
  const deleteRecipe = () => {
    Alert.alert(
      'Delete Recipe',
      'Are you sure you want to delete this recipe?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = recipes.filter((r) => r.id !== recipe.id);
            setRecipes(updated);
            navigation.goBack();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={recipe.image ? { uri: recipe.image } : require('../assets/placeholder.png')}
        style={styles.image}
      />

      <Text style={styles.title}>{recipe.name}</Text>

      <Text style={styles.label}>Ingredients:</Text>
      <Text style={styles.text}>{recipe.ingredients.join(', ')}</Text>

      <Text style={styles.label}>Instructions:</Text>
      <Text style={styles.text}>{recipe.instructions}</Text>

      <Text style={styles.text}>⏱ Time: {recipe.time}</Text>
      <Text style={styles.text}>🍽 Servings: {recipe.servings}</Text>
      <Text style={styles.text}>🔥 Calories: {recipe.calories}</Text>
      <Text style={styles.text}>🎯 Difficulty: {recipe.difficulty}</Text>

      {/* Show Edit/Delete only if it's your own recipe */}
      {recipe.category === 'My Recipes' && (
        <View style={styles.buttonRow}>
          <Button
            title="Edit"
            onPress={() =>
              navigation.navigate('Edit Recipe', {
                recipe,
                recipes,
                setRecipes,
              })
            }
            color="#007bff"
          />
          <Button title="Delete" onPress={deleteRecipe} color="red" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  image: { height: 200, marginBottom: 10, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  label: { fontWeight: 'bold', marginTop: 10 },
  text: { marginBottom: 5 },
  buttonRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
