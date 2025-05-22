// /controllers/recipeController.js
const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

// Add a new recipe
exports.addRecipe = async (req, res) => {
  try {
    const newRecipe = {
      ...req.body,
      user: req.user.id, // Add the user ID from the auth middleware
      createdAt: new Date()
    };

    const recipe = new Recipe(newRecipe);
    await recipe.save();
    res.status(201).json({ message: 'Recipe added successfully', recipe });
  } catch (err) {
    console.error('Error adding recipe:', err);
    res.status(500).json({ error: 'Failed to add recipe' });
  }
};

// Get all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
};

// Get a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id)
      .populate('user', 'username');

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ error: 'Error fetching recipe' });
  }
};

// Update a recipe
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if the user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to update this recipe' });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    res.json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (err) {
    console.error('Error updating recipe:', err);
    res.status(500).json({ error: 'Error updating recipe' });
  }
};

// Delete a recipe
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Check if the user owns the recipe
    if (recipe.user.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this recipe' });
    }

    await Recipe.findByIdAndDelete(req.params.id);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    console.error('Error deleting recipe:', err);
    res.status(500).json({ error: 'Error deleting recipe' });
  }
};

// Get recipes created by the logged-in user
exports.getUserRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(recipes);
  } catch (err) {
    console.error('Error fetching user recipes:', err);
    res.status(500).json({ error: 'Error fetching user recipes' });
  }
};
