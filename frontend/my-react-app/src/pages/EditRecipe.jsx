import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getRecipeById, updateRecipe } from '../utils/api';
import './EditRecipe.css';

const EditRecipe = () => {
  const { id } = useParams();
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form state
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState('Easy');
  const [imageUrl, setImageUrl] = useState('');
  
  // Fetch recipe data
  useEffect(() => {
    const fetchRecipe = async () => {
      if (!user || !token) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        const data = await getRecipeById(id);
        
        // Check if the recipe belongs to the current user
        if (data.user && data.user._id !== user._id) {
          setError('You do not have permission to edit this recipe.');
          setLoading(false);
          return;
        }
        
        setRecipe(data);
        
        // Populate form fields
        setName(data.name || '');
        setIngredients(data.ingredients || '');
        setInstructions(data.instructions || '');
        setDifficulty(data.difficulty || 'Easy');
        setImageUrl(data.image || '');
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError('Failed to load recipe. Please try again.');
        setLoading(false);
      }
    };
    
    fetchRecipe();
  }, [id, user, token, navigate]);
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user || !token) {
      navigate('/login');
      return;
    }
    
    try {
      setSaving(true);
      setError(null);
      setSuccess(false);
      
      const updatedRecipe = {
        name,
        ingredients,
        instructions,
        difficulty,
        image: imageUrl
      };
      
      await updateRecipe(id, updatedRecipe, token);
      
      setSuccess(true);
      setSaving(false);
      
      // Redirect after a short delay
      setTimeout(() => {
        navigate(`/recipe/${id}`);
      }, 1500);
    } catch (err) {
      console.error('Error updating recipe:', err);
      setError(err.response?.data?.message || 'Failed to update recipe. Please try again.');
      setSaving(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-400"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="edit-title text-4xl font-bold text-center text-gray-800 mb-2">
          Edit <span className="text-red-400">Recipe</span>
        </h1>
        <p className="edit-subtitle text-center text-gray-600 mb-8">
          Update your recipe details
        </p>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                Recipe updated successfully! Redirecting...
              </div>
            )}
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Recipe Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-1">
                Ingredients (comma separated)
              </label>
              <textarea
                id="ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">
                Instructions
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                required
                rows={6}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                id="image"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-gray-500 mb-1">Preview:</p>
                  <img
                    src={imageUrl}
                    alt="Recipe preview"
                    className="h-40 w-auto object-cover rounded-md"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                    }}
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
