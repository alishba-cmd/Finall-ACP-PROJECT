import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mockBlogs = {
    '1': {
      _id: '1',
      title: 'The Art of Pasta Making',
      author: 'Chef Maria',
      createdAt: new Date('2023-05-15'),
      content: `
        <p>Making pasta from scratch is a rewarding culinary experience that connects you to centuries of Italian tradition. The process is simple but requires attention to detail and practice to master.</p>

        <h3>Selecting the Right Ingredients</h3>
        <p>The best pasta starts with high-quality ingredients. For traditional pasta, you'll need:</p>
        <ul>
          <li>Semolina flour (or "00" flour for more delicate pasta)</li>
          <li>Fresh eggs (at room temperature)</li>
          <li>A pinch of salt</li>
          <li>A small amount of olive oil (optional)</li>
        </ul>

        <h3>The Mixing and Kneading Process</h3>
        <p>Begin by creating a well with your flour on a clean work surface. Crack the eggs into the center and add salt. Using a fork, gradually incorporate the flour into the eggs until a shaggy dough forms.</p>

        <p>Kneading is where the magic happens. This process develops the gluten in the flour, giving your pasta its structure and bite. Knead the dough for at least 10 minutes until it becomes smooth and elastic.</p>

        <h3>Resting the Dough</h3>
        <p>Allow your dough to rest, wrapped in plastic, for at least 30 minutes. This relaxes the gluten and makes the dough easier to roll out.</p>

        <h3>Rolling and Cutting</h3>
        <p>Whether using a pasta machine or rolling by hand, the goal is to achieve thin, even sheets. Start with small pieces of dough and work gradually. For hand-cut pasta, roll the sheets and slice to your desired width.</p>

        <h3>Drying and Cooking</h3>
        <p>Fresh pasta cooks much faster than dried - usually 2-3 minutes in boiling water. For the best texture, cook until al dente and finish cooking in your sauce.</p>

        <p>With practice, you'll develop a feel for the perfect pasta dough and create shapes and variations that express your personal style in the kitchen.</p>
      `,
      image: 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    },
    '2': {
      _id: '2',
      title: 'Seasonal Cooking: Spring Edition',
      author: 'James Peterson',
      createdAt: new Date('2023-04-10'),
      content: `
        <p>Spring brings a bounty of fresh, vibrant ingredients that inspire lighter, brighter cooking after the hearty meals of winter. Embracing seasonal produce not only ensures the best flavor but also supports local agriculture and sustainable eating practices.</p>

        <h3>Spring Vegetables to Celebrate</h3>
        <p>Look for these seasonal treasures at your local farmers' market:</p>
        <ul>
          <li>Asparagus - The quintessential spring vegetable, perfect simply roasted or in risottos</li>
          <li>Artichokes - Requiring some preparation but rewarding with unique flavor</li>
          <li>Peas - Sweet fresh peas bear no resemblance to their frozen counterparts</li>
          <li>Fava beans - A labor of love with a buttery, earthy flavor</li>
          <li>Spring onions - Milder and more versatile than mature onions</li>
          <li>Radishes - Crisp, peppery, and beautiful on spring tables</li>
        </ul>

        <h3>Herbs and Greens</h3>
        <p>Spring is also the time for tender herbs and greens:</p>
        <ul>
          <li>Fresh mint - Perfect in both sweet and savory dishes</li>
          <li>Tender lettuces - The base for perfect spring salads</li>
          <li>Arugula - Peppery and perfect for adding dimension to dishes</li>
          <li>Chives - With their delicate onion flavor and pretty purple blossoms</li>
        </ul>

        <h3>Spring Fruit Stars</h3>
        <p>Early fruits make their appearance:</p>
        <ul>
          <li>Strawberries - The first berries of the season</li>
          <li>Rhubarb - Technically a vegetable but used as a fruit in delicious desserts</li>
        </ul>

        <h3>Cooking Techniques for Spring</h3>
        <p>Lighter cooking methods preserve the delicate flavors of spring produce:</p>
        <ul>
          <li>Quick blanching</li>
          <li>Light steaming</li>
          <li>Brief sautéing</li>
          <li>Raw preparations like salads and crudités</li>
        </ul>

        <p>Let the natural flavors shine with minimal seasoning - good olive oil, lemon, and fresh herbs are often all you need to create memorable spring dishes.</p>
      `,
      image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'
    }
  };

  useEffect(() => {
    if (mockBlogs[id]) {
      setBlog(mockBlogs[id]);
      setLoading(false);
    } else {
      setError('Blog not found');
      setLoading(false);
    }

  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;
  if (!blog) return <div className="min-h-screen flex items-center justify-center"><p>Blog not found</p></div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-64 md:h-80 object-cover"
          />
        )}
        <div className="p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>

          <div className="flex items-center text-gray-500 mb-6">
            <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>By {blog.author}</span>
          </div>

          <div
            className="prose prose-lg max-w-none text-gray-700"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div className="mt-8 pt-6 border-t border-gray-200">
            <Link
              to="/blog"
              className="inline-block text-recipe-primary hover:text-recipe-secondary font-medium"
            >
              ← Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
