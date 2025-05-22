import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getRecipes } from '../utils/api';
import './Recipes.css';

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const recipesPerPage = 3;

  // Filter state
  const [filters, setFilters] = useState({
    ingredient: searchParams.get('ingredient') || '',
    difficulty: searchParams.get('difficulty') || ''
  });


  const [availableIngredients, setAvailableIngredients] = useState([]);
  const [availableDifficulties, setAvailableDifficulties] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getRecipes();
        setAllRecipes(data);

        // Extract unique ingredients and difficulties for filters
        const extractIngredients = (recipes) => {
          const allIngredients = recipes.flatMap(recipe =>
            recipe.ingredients.split(',').map(ingredient => ingredient.trim())
          );
          return [...new Set(allIngredients)].filter(Boolean).sort();
        };

        const extractDifficulties = (recipes) => {
          const allDifficulties = recipes.map(recipe => recipe.difficulty);
          return [...new Set(allDifficulties)].filter(Boolean).sort();
        };

        if (data && data.length > 0) {
          setAvailableIngredients(extractIngredients(data));
          setAvailableDifficulties(extractDifficulties(data));
        }

        setLoading(false);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to load recipes. Please try again later.');
        setLoading(false);

        const mockData = [
          {
            _id: '1',
            name: 'Spaghetti Carbonara',
            ingredients: 'Pasta, Eggs, Pancetta, Parmesan Cheese, Black Pepper',
            difficulty: 'Medium',
            image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '2',
            name: 'Chicken Tikka Masala',
            ingredients: 'Chicken, Yogurt, Tomatoes, Onions, Spices',
            difficulty: 'Medium',
            image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '3',
            name: 'Vegetable Stir Fry',
            ingredients: 'Bell Peppers, Broccoli, Carrots, Soy Sauce, Ginger',
            difficulty: 'Easy',
            image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '4',
            name: 'Chocolate Chip Cookies',
            ingredients: 'Flour, Butter, Sugar, Chocolate Chips, Vanilla Extract',
            difficulty: 'Easy',
            image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '5',
            name: 'Greek Salad',
            ingredients: 'Cucumber, Tomatoes, Olives, Feta Cheese, Olive Oil',
            difficulty: 'Easy',
            image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          },
          {
            _id: '6',
            name: 'Beef Tacos',
            ingredients: 'Ground Beef, Taco Shells, Lettuce, Tomatoes, Cheese',
            difficulty: 'Easy',
            image: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
          }
        ];

        setAllRecipes(mockData);

        setAvailableIngredients([...new Set(mockData.flatMap(recipe =>
          recipe.ingredients.split(',').map(ingredient => ingredient.trim())
        ))].filter(Boolean).sort());

        setAvailableDifficulties([...new Set(mockData.map(recipe => recipe.difficulty))].filter(Boolean).sort());
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.ingredient) params.set('ingredient', filters.ingredient);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (currentPage > 1) params.set('page', currentPage.toString());
    setSearchParams(params);
  }, [filters, currentPage, setSearchParams]);

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter(recipe => {
     
      if (filters.ingredient && !recipe.ingredients.toLowerCase().includes(filters.ingredient.toLowerCase())) {
        return false;
      }

      if (filters.difficulty && recipe.difficulty !== filters.difficulty) {
        return false;
      }

      return true;
    });
  }, [allRecipes, filters]);


  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

 
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1); 
  };

  
  const clearFilters = () => {
    setFilters({ ingredient: '', difficulty: '' });
    setCurrentPage(1);
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

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
        <h1 className="page-title text-4xl font-bold text-center text-gray-800 mb-2">
          All <span className="text-red-400">Recipes</span>
        </h1>
        <p className="page-description text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our collection of delicious recipes shared by our community. Click on any recipe to view the full details.
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 filter-section">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Ingredient Filter */}
            <div>
              <label htmlFor="ingredient-filter" className="block text-sm font-medium text-gray-700 mb-1">
                By Ingredient
              </label>
              <select
                id="ingredient-filter"
                value={filters.ingredient}
                onChange={(e) => handleFilterChange('ingredient', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">All Ingredients</option>
                {availableIngredients.map((ingredient) => (
                  <option key={ingredient} value={ingredient}>
                    {ingredient}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label htmlFor="difficulty-filter" className="block text-sm font-medium text-gray-700 mb-1">
                By Difficulty
              </label>
              <select
                id="difficulty-filter"
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">All Difficulties</option>
                {availableDifficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear Filters Button */}
          {(filters.ingredient || filters.difficulty) && (
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
            >
              Clear Filters
            </button>
          )}

          {/* Filter Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'}
            {(filters.ingredient || filters.difficulty) && ' with current filters'}
          </div>
        </div>

        {/* Recipes List - Vertical Layout */}
        <div className="recipes-list space-y-6">
          {currentRecipes.map((recipe) => (
            <div
              key={recipe._id}
              onClick={() => handleRecipeClick(recipe._id)}
              className="recipe-card bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer flex flex-col md:flex-row"
            >
              <div className="recipe-image md:w-1/3 h-48 md:h-auto overflow-hidden">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-6 md:w-2/3">
                <h3 className="font-bold text-xl text-gray-800 mb-2">{recipe.name}</h3>
                <p className="text-gray-600 mb-4">{recipe.ingredients}</p>
                <div className="flex items-center justify-between">
                  <span className={`difficulty-badge text-xs px-3 py-1 rounded-full ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="text-sm text-gray-500">
                    {recipe.user ? `by ${recipe.user.username}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination flex justify-center mt-10 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-md ${
                  currentPage === index + 1
                    ? 'bg-red-400 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {filteredRecipes.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No recipes found with the current filters.</p>
            <button
              onClick={clearFilters}
              className="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-500 transition mr-4"
            >
              Clear Filters
            </button>
            <button
              onClick={() => navigate('/add')}
              className="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-500 transition"
            >
              Add Recipe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recipes;
