import { useState, useContext } from 'react';
import { addRecipe } from '../utils/api';
import { AuthContext } from '../context/AuthContext';

const RecipeForm = ({ onBack }) => {
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: '',
    ingredients: '',
    instructions: '', // Added instructions field
    difficulty: 'Easy',
    image: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('You must be logged in to add a recipe');
      return;
    }

    try {
      console.log('Submitting recipe data:', form);
      console.log('Using token:', token);

      const response = await addRecipe(form, token);
      console.log('API response:', response);

      if (response.message === 'Recipe added successfully') {
        alert('Recipe added successfully!');
        onBack();
      } else {
        alert('Recipe added!');
        onBack();
      }
    } catch (error) {
      console.error('Error details:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);

        if (error.response.status === 401) {
          alert('Authentication error. Please log in again.');
        } else {
          alert('Failed to add recipe: ' + (error.response.data.message || 'Unknown error'));
        }
      } else {
        alert('Failed to add recipe. See console for details.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Recipe</h2>

      <label className="block mb-2">Name</label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
        required
      />

      <label className="block mb-2">Ingredients (comma separated)</label>
      <textarea
        name="ingredients"
        value={form.ingredients}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
        placeholder="Ingredient 1, Ingredient 2, Ingredient 3..."
        required
      ></textarea>

      <label className="block mb-2">Instructions</label>
      <textarea
        name="instructions"
        value={form.instructions}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
        placeholder="Step by step instructions..."
        rows="4"
        required
      ></textarea>

      <label className="block mb-2">Difficulty</label>
      <select
        name="difficulty"
        value={form.difficulty}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
        required
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Difficult">Difficult</option>
      </select>

      <label className="block mb-2">Image URL</label>
      <input
        type="text"
        name="image"
        value={form.image}
        onChange={handleChange}
        className="w-full mb-4 p-2 border"
      />

      <div className="flex justify-between">
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Submit</button>
        <button type="button" onClick={onBack} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
      </div>
    </form>
  );
};

export default RecipeForm;
