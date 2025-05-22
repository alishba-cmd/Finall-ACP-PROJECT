import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {blog.image && (
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{blog.title}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{blog.author}</span>
        </div>
        <p className="text-gray-600 mb-4 line-clamp-3">{blog.summary}</p>
        <Link 
          to={`/blog/${blog._id}`}
          className="inline-block text-recipe-primary hover:text-recipe-secondary font-medium"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
