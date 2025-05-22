import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getUserRecipes, deleteRecipe } from '../utils/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  
  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!user || !token) {
        navigate('/login');
        return;
      }
      
      try {
        setLoading(true);
        const data = await getUserRecipes(token);
        setRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching user recipes:', err);
        setError('Failed to load your recipes. Please try again.');
        setLoading(false);
      }
    };
    
    fetchUserRecipes();
  }, [user, token, navigate]);
  
  const handleRecipeSelect = (recipeId) => {
    setSelectedRecipes(prev => {
      if (prev.includes(recipeId)) {
        return prev.filter(id => id !== recipeId);
      } else {
        return [...prev, recipeId];
      }
    });
  };
  

  const handleSelectAll = () => {
    if (selectedRecipes.length === recipes.length) {
      setSelectedRecipes([]);
    } else {
      setSelectedRecipes(recipes.map(recipe => recipe._id));
    }
  };
  
 
  const openDeleteModal = (recipeId = null) => {
    setRecipeToDelete(recipeId);
    setIsDeleteModalOpen(true);
  };
  

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setRecipeToDelete(null);
  };
  
 
  const handleDeleteRecipe = async () => {
    try {
      if (recipeToDelete) {
       
        await deleteRecipe(recipeToDelete, token);
        setRecipes(prev => prev.filter(recipe => recipe._id !== recipeToDelete));
      } else {
       
        await Promise.all(selectedRecipes.map(id => deleteRecipe(id, token)));
        setRecipes(prev => prev.filter(recipe => !selectedRecipes.includes(recipe._id)));
        setSelectedRecipes([]);
      }
      closeDeleteModal();
    } catch (err) {
      console.error('Error deleting recipe(s):', err);
      setError('Failed to delete recipe(s). Please try again.');
      closeDeleteModal();
    }
  };
  

  const handleEditRecipe = (recipeId) => {
    navigate(`/edit-recipe/${recipeId}`);
  };
  

  const handleViewRecipe = (recipeId) => {
    navigate(`/recipe/${recipeId}`);
  };
  
  
  const filteredRecipes = recipes.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  
  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'name-asc') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'name-desc') {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-red-400"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="dashboard-title text-4xl font-bold text-center text-gray-800 mb-2">
          My <span className="text-red-400">Dashboard</span>
        </h1>
        <p className="dashboard-subtitle text-center text-gray-600 mb-8">
          Manage your recipes and account settings
        </p>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Dashboard Navigation */}
          <div className="flex border-b border-gray-200">
            <button className="px-6 py-4 text-red-400 border-b-2 border-red-400 font-medium">
              My Recipes
            </button>
            <button 
              onClick={() => navigate('/profile')}
              className="px-6 py-4 text-gray-600 hover:text-red-400 font-medium"
            >
              Profile Settings
            </button>
          </div>
          
          {/* Recipe Management Tools */}
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              {/* Search */}
              <div className="w-full md:w-1/3">
                <input
                  type="text"
                  placeholder="Search recipes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
                
                {/* Bulk Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/add')}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                  >
                    Add Recipe
                  </button>
                  
                  {selectedRecipes.length > 0 && (
                    <button
                      onClick={() => openDeleteModal()}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                    >
                      Delete Selected
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}
            
            {/* Recipes Table */}
            {sortedRecipes.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-12 px-4 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedRecipes.length === recipes.length && recipes.length > 0}
                          onChange={handleSelectAll}
                          className="rounded text-red-400 focus:ring-red-400"
                        />
                      </th>
                      <th className="px-4 py-3 text-left">Recipe</th>
                      <th className="px-4 py-3 text-left">Difficulty</th>
                      <th className="px-4 py-3 text-left">Date Created</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedRecipes.map((recipe) => (
                      <tr key={recipe._id} className="recipe-row hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={selectedRecipes.includes(recipe._id)}
                            onChange={() => handleRecipeSelect(recipe._id)}
                            className="rounded text-red-400 focus:ring-red-400"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="h-12 w-12 flex-shrink-0 mr-3">
                              {recipe.image ? (
                                <img
                                  src={recipe.image}
                                  alt={recipe.name}
                                  className="h-12 w-12 rounded-md object-cover"
                                />
                              ) : (
                                <div className="h-12 w-12 rounded-md bg-gray-200 flex items-center justify-center">
                                  <span className="text-gray-400 text-xs">No image</span>
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800">{recipe.name}</div>
                              <div className="text-sm text-gray-500 truncate max-w-xs">{recipe.ingredients}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                            recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {recipe.difficulty}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500">
                          {new Date(recipe.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleViewRecipe(recipe._id)}
                              className="text-blue-500 hover:text-blue-700"
                              title="View Recipe"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                              </svg>
                            </button>
                            <button
                              onClick={() => handleEditRecipe(recipe._id)}
                              className="text-yellow-500 hover:text-yellow-700"
                              title="Edit Recipe"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => openDeleteModal(recipe._id)}
                              className="text-red-500 hover:text-red-700"
                              title="Delete Recipe"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">
                  {searchTerm ? 'No recipes match your search.' : 'You haven\'t added any recipes yet.'}
                </p>
                <button
                  onClick={() => navigate('/add')}
                  className="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-500 transition"
                >
                  Add Your First Recipe
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              {recipeToDelete ? 'Delete Recipe' : 'Delete Selected Recipes'}
            </h3>
            <p className="text-gray-600 mb-6">
              {recipeToDelete
                ? 'Are you sure you want to delete this recipe? This action cannot be undone.'
                : `Are you sure you want to delete ${selectedRecipes.length} selected recipes? This action cannot be undone.`
              }
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteRecipe}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
