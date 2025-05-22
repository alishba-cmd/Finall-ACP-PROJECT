import { useState } from 'react';
import RecipeForm from '../components/RecipeForm';
import createImage from '../assets/create.jpg';

const AddRecipe = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 p-6">
      {!showForm ? (
        <div className="flex flex-col md:flex-row items-center justify-start md:space-x-8">
          <img src={createImage} alt="Delicious Food" className="w-80 md:ml-20 rounded-xl shadow-lg mb-6 md:mb-0" />
          <div className="max-w-xl md:ml-4 md:mr-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Feeling Hungry?</h2>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              Share your delicious creations with the world! Add your favorite recipes, choose the difficulty level, and upload a mouth-watering photo to inspire others.
            </p>
            <button onClick={() => setShowForm(true)} className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500 transition">
              Create a Recipe
            </button>
          </div>
        </div>
      ) : (
        <RecipeForm onBack={() => setShowForm(false)} />
      )}
    </div>
  );
};

export default AddRecipe;

