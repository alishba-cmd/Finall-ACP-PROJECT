import React, { useContext, useEffect, useState } from 'react';
import api from '../utils/api';
import { AuthContext } from '../context/AuthContext';
import RecipeCard from '../components/RecipeCard';

const MyRecipes = () => {
  const { user } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchMyRecipes = async () => {
      try {
        const res = await api.get(`/recipes/user/${user._id}`);
        setRecipes(res.data);
      } catch (error) {
        console.error("Failed to fetch user's recipes:", error);
      }
    };
    if (user) fetchMyRecipes();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">My Recipes</h2>

        {recipes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">You haven't added any recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyRecipes;