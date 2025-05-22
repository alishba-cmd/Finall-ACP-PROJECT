import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-5 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{recipe.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{recipe.ingredients}</p>
      <div className="text-sm text-gray-500 mb-2">Difficulty: {recipe.difficulty}</div>
      {recipe.image && (
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-32 object-cover rounded mb-3"
        />
      )}
      <Link
        to={`/recipe/${recipe._id}`}
        className="inline-block text-blue-600 hover:text-blue-800 font-medium"
      >
        View Details
      </Link>
    </div>
  );
};

export default RecipeCard;