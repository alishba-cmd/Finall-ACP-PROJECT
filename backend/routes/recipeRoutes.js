const express = require('express');
const router = express.Router();
const {
  addRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getUserRecipes
} = require('../controllers/recipeController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getAllRecipes);

// Protected routes (require authentication)
router.post('/', protect, addRecipe);
router.get('/user', protect, getUserRecipes); // Changed route and moved it before /:id
router.put('/:id', protect, updateRecipe);
router.delete('/:id', protect, deleteRecipe);
router.get('/:id', getRecipeById); // Moved this after specific routes

module.exports = router;
