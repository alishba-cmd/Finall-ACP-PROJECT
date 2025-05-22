import React from 'react';
import { useNavigate } from 'react-router-dom';
import pastaImage from '../assets/pastaa.png';
import RecipeSlider from '../components/RecipeSlider';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100">
      {/* Navbar removed from here */}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 py-16">
        {/* Left */}
        <div className="max-w-xl mb-10 md:mb-0">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Kitchen Companion <br />
             <span className="text-red-400">Organize, Cook, and Savor Every Recipe!</span>
          </h1>
          <p className="text-gray-600 mb-6">
           Managing recipes has never been easier! With Recipe Manager, you can save, organize, and access your favorite recipes anytime, anywhere. Whether you're a home cook or a food enthusiast, our app helps you plan meals effortlessly, discover new dishes, and keep your kitchen creative. Say goodbye to scattered notes and hello to a smarter, tastier cooking experience!
          </p>
          <button
            onClick={() => navigate('/register')}
            className="bg-red-400 text-white px-6 py-2 rounded hover:bg-red-500 transition"
          >
            Register
          </button>
          <p className="mt-2 text-sm">
            Do you have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="text-red-400 cursor-pointer hover:underline"
            >
              Log in
            </span>
          </p>
        </div>

        {/* Right Image and Review */}
        <div className="relative">
    <img
            src={pastaImage}  // Use imported image here
            alt="Delicious Pasta"
            className="w-96 h-auto rounded-full shadow-lg"
          />
          {/* Review Box */}
          <div className="absolute -bottom-8 left-6 bg-white p-4 rounded-xl shadow-md flex items-start space-x-3 max-w-xs">
            <img
              src="https://randomuser.me/api/portraits/women/68.jpg"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">Sara Johnson</p>
              <p className="text-xs text-yellow-500">★ 4.8/5</p>
              <p className="text-xs mt-1 text-gray-600">Wow, this recipe is a flavor explosion in my mouth! Very delicious.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recipe Slider Section */}
      <div className="mt-16">
        <RecipeSlider />
      </div>
    </div>
  );
};

export default Home;

