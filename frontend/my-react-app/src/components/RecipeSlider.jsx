import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes } from '../utils/api';
import './RecipeSlider.css';

const RecipeSlider = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  // Fetch recipes when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setLoading(false);

        // If no recipes are available, use mock data
        setRecipes([
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
        ]);
      }
    };

    fetchRecipes();
  }, []);

  // Function to handle next slide
  const nextSlide = () => {
    if (recipes.length <= 3) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length);
  };

  // Function to handle previous slide
  const prevSlide = () => {
    if (recipes.length <= 3) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + recipes.length) % recipes.length);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (recipes.length > 3) {
        nextSlide();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [recipes.length]);

  // Get visible recipes (3 at a time)
  const getVisibleRecipes = () => {
    if (recipes.length <= 3) return recipes;

    const visibleRecipes = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % recipes.length;
      visibleRecipes.push(recipes[index]);
    }
    return visibleRecipes;
  };

  // Handle recipe click
  const handleRecipeClick = (id) => {
    navigate(`/recipe/${id}`);
  };

  if (loading) {
    return (
      <div className="w-full py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Featured <span className="text-red-400">Recipes</span>
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Previous button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
          aria-label="Previous recipe"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Recipe slider */}
        <div
          ref={sliderRef}
          className="flex justify-center gap-6 overflow-hidden"
        >
          {getVisibleRecipes().map((recipe, index) => (
            <div
              key={recipe._id}
              onClick={() => handleRecipeClick(recipe._id)}
              className={`recipe-card fade-in w-72 h-72 bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:shadow-xl`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="h-40 overflow-hidden">
                {recipe.image ? (
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-1 truncate">{recipe.name}</h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">{recipe.ingredients}</p>
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {recipe.difficulty}
                  </span>
                  <span className="ml-auto text-xs text-gray-500">
                    {recipe.user ? `by ${recipe.user.username}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-all duration-300"
          aria-label="Next recipe"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Dots indicator */}
      {recipes.length > 3 && (
        <div className="flex justify-center mt-6 space-x-2">
          {recipes.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-red-400 w-4 active-dot' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* View all recipes button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/recipes')}
          className="inline-flex items-center px-6 py-3 bg-red-400 text-white rounded-full hover:bg-red-500 transition-all duration-300 slide-in"
        >
          View All Recipes
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RecipeSlider;
