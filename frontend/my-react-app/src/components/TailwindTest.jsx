import React from 'react';

const TailwindTest = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-8 bg-recipe-light">
      <h1 className="text-3xl font-bold text-recipe-dark mb-4">Tailwind CSS Test with Custom Theme</h1>

      {/* Card 1 - Basic Card with Custom Colors */}
      <div className="p-6 max-w-sm mx-auto bg-white rounded-recipe shadow-recipe flex items-center space-x-4">
        <div className="shrink-0">
          <div className="h-12 w-12 bg-recipe-primary rounded-full flex items-center justify-center text-white font-bold">T</div>
        </div>
        <div>
          <div className="text-xl font-medium text-recipe-dark">Custom Colors</div>
          <p className="text-gray-500">Using our custom color palette defined in the theme.</p>
        </div>
      </div>

      {/* Card 2 - Hover Effects with Custom Colors */}
      <div className="p-6 max-w-sm mx-auto bg-white rounded-recipe shadow-md hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-recipe-dark mb-2">Hover Effects</h3>
        <p className="text-gray-600">This card has hover effects. Try hovering over it!</p>
        <button className="mt-4 px-4 py-2 bg-recipe-secondary text-white rounded-lg hover:bg-recipe-primary transition-colors">
          Hover Me
        </button>
      </div>

      {/* Card 3 - Responsive Design with Custom Colors */}
      <div className="p-6 max-w-sm mx-auto bg-gradient-to-r from-recipe-secondary to-recipe-primary rounded-recipe shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-2">Responsive Design</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-white bg-opacity-20 p-3 rounded-lg text-white">
            <p>Column 1</p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-lg text-white">
            <p>Column 2</p>
          </div>
        </div>
      </div>

      {/* Card 4 - Recipe Card Example */}
      <div className="p-6 max-w-sm mx-auto bg-white rounded-recipe shadow-recipe overflow-hidden">
        <div className="h-40 bg-recipe-accent -mx-6 -mt-6 mb-4 flex items-center justify-center">
          <span className="text-recipe-dark text-xl font-bold">Recipe Image</span>
        </div>
        <h3 className="text-xl font-semibold text-recipe-dark mb-2">Delicious Recipe</h3>
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span className="mr-2">⏱️ 30 min</span>
          <span className="mr-2">•</span>
          <span>👨‍🍳 Easy</span>
        </div>
        <p className="text-gray-600 mb-4">A delicious recipe made with our custom Tailwind theme colors and components.</p>
        <button className="w-full py-2 bg-recipe-primary text-white rounded-lg hover:bg-recipe-secondary transition-colors">
          View Recipe
        </button>
      </div>
    </div>
  );
};

export default TailwindTest;
