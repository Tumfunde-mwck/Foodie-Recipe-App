import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddRecipeForm({ navigation, recipes, setRecipes }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [time, setTime] = useState('');
  const [servings, setServings] = useState('');
  const [calories, setCalories] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera roll permissions are required to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const saveRecipe = () => {
    if (!name || !image || !ingredients || !instructions) {
      Alert.alert('Missing Fields', 'Please fill all required fields and select an image.');
      return;
    }

    const newRecipe = {
      id: Date.now(),
      name,
      image,
      ingredients: ingredients.split(',').map(i => i.trim()),
      instructions,
      time,
      servings,
      calories,
      difficulty,
      category: 'My Recipes'
    };

    setRecipes([...recipes, newRecipe]);
    navigation.navigate('My Recipes');
  };

  return (
    <ScrollView style={{ padding: 15 }}>
      <TextInput placeholder="Recipe Name" value={name} onChangeText={setName} />
      <Button title="Pick an Image" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: '100%', height: 200, marginVertical: 10 }} />
      )}
      <TextInput placeholder="Ingredients (comma separated)" value={ingredients} onChangeText={setIngredients} />
      <TextInput placeholder="Instructions" value={instructions} onChangeText={setInstructions} />
      <TextInput placeholder="Time" value={time} onChangeText={setTime} />
      <TextInput placeholder="Servings" value={servings} onChangeText={setServings} />
      <TextInput placeholder="Calories" value={calories} onChangeText={setCalories} />
      <TextInput placeholder="Difficulty" value={difficulty} onChangeText={setDifficulty} />
      <Button title="Save Recipe" onPress={saveRecipe} />
    </ScrollView>
  );
}
