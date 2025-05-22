import React, { useState, useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import api from '../utils/api';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockBlogs = [
    {
      _id: '1',
      title: 'The Art of Pasta Making',
      author: 'Chef Maria',
      createdAt: new Date('2023-05-15'),
      summary: 'Learn the secrets of making perfect pasta from scratch. This guide covers everything you need to know.',
      image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      _id: '2',
      title: 'Seasonal Cooking: Spring Edition',
      author: 'James Peterson',
      createdAt: new Date('2023-04-10'),
      summary: 'Embrace the flavors of spring with these fresh and vibrant recipes that celebrate the season\'s best produce.',
      image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      _id: '3',
      title: 'The Science of Baking',
      author: 'Dr. Emily Chen',
      createdAt: new Date('2023-03-22'),
      summary: 'Understand the chemistry behind successful baking and why certain techniques yield better results.',
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      _id: '4',
      title: 'Global Flavors: Thai Cuisine',
      author: 'Suki Rathana',
      createdAt: new Date('2023-02-18'),
      summary: 'Dive into the vibrant world of Thai cooking and learn to recreate authentic dishes at home.',
      image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      _id: '5',
      title: 'Sustainable Cooking Practices',
      author: 'Alex Green',
      createdAt: new Date('2023-01-30'),
      summary: 'Reduce your environmental impact with these eco-friendly cooking tips for a greener kitchen.',
      image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    {
      _id: '6',
      title: 'Cooking for Special Diets',
      author: 'Nutritionist Sarah',
      createdAt: new Date('2023-01-05'),
      summary: 'Navigate dietary restrictions with confidence and create delicious meals for all dietary needs.',
      image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  useEffect(() => {
    
    setBlogs(mockBlogs);
    setLoading(false);

  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Recipe Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our collection of culinary insights, cooking tips, and food stories to inspire your next kitchen adventure.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
