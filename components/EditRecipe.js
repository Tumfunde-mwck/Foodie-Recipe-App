import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Alert, StyleSheet } from 'react-native';

export default function EditRecipe({ route, navigation }) {
  const { recipe, recipes, setRecipes } = route.params;

  // Pre-filled form fields
  const [name, setName] = useState(recipe.name);
  const [image, setImage] = useState(recipe.image);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join(', '));
  const [instructions, setInstructions] = useState(recipe.instructions);
  const [time, setTime] = useState(recipe.time);
  const [servings, setServings] = useState(recipe.servings);
  const [calories, setCalories] = useState(recipe.calories);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);

  const saveEditedRecipe = () => {
    const updatedRecipe = {
      ...recipe,
      name,
      image,
      ingredients: ingredients.split(',').map(i => i.trim()),
      instructions,
      time,
      servings,
      calories,
      difficulty,
    };

    const updatedList = recipes.map(r => r.id === recipe.id ? updatedRecipe : r);
    setRecipes(updatedList);

    Alert.alert('Success', 'Recipe updated!');
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Recipe Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />
      <TextInput
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChangeText={setIngredients}
        style={styles.input}
      />
      <TextInput
        placeholder="Instructions"
        value={instructions}
        onChangeText={setInstructions}
        style={[styles.input, { height: 100 }]}
        multiline
      />
      <TextInput
        placeholder="Time"
        value={time}
        onChangeText={setTime}
        style={styles.input}
      />
      <TextInput
        placeholder="Servings"
        value={servings}
        onChangeText={setServings}
        style={styles.input}
      />
      <TextInput
        placeholder="Calories"
        value={calories}
        onChangeText={setCalories}
        style={styles.input}
      />
      <TextInput
        placeholder="Difficulty"
        value={difficulty}
        onChangeText={setDifficulty}
        style={styles.input}
      />

      <Button title="Save Changes" onPress={saveEditedRecipe} color="green" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 15 },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});
