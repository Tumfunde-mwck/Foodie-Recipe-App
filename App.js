import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoryList from './components/CategoryList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import MyRecipes from './components/MyRecipes';
import EditRecipe from './components/EditRecipe'
const Stack = createNativeStackNavigator();

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => (
            <CategoryList
              {...props}
              recipes={recipes}
              setRecipes={setRecipes}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Details">
          {(props) => (
            <RecipeDetails
              {...props}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Add Recipe">
          {(props) => (
            <AddRecipeForm
              {...props}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="My Recipes">
          {(props) => (
            <MyRecipes
              {...props}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Edit Recipe">
          {(props) => (
            <EditRecipe
              {...props}
              recipes={recipes}
              setRecipes={setRecipes}
            />
          )}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
