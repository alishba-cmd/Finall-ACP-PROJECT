import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await api.get(`/recipes/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="text-center text-gray-500 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{recipe.name}</h2>

        {recipe.image && (
          <img
            src={recipe.image}
            alt={recipe.name}
            className="w-full h-64 object-cover rounded mb-6"
          />
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Difficulty:</h3>
          <p className="text-gray-700">{recipe.difficulty}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Ingredients:</h3>
          <p className="text-gray-700 whitespace-pre-line">{recipe.ingredients}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;