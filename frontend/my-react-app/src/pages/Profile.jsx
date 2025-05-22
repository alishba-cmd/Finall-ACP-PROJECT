import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { updatePassword } from '../utils/api';
import './Profile.css';

const Profile = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  // Check if user is logged in
  if (!user || !token) {
    navigate('/login');
    return null;
  }
  
  // Handle password change
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    // Reset messages
    setError(null);
    setSuccess(null);
    
    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }
    
    try {
      setLoading(true);
      await updatePassword(currentPassword, newPassword, token);
      setSuccess('Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setLoading(false);
    } catch (err) {
      console.error('Error updating password:', err);
      setError(err.response?.data?.message || 'Failed to update password. Please try again.');
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-white via-pink-50 to-pink-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="profile-title text-4xl font-bold text-center text-gray-800 mb-2">
          My <span className="text-red-400">Profile</span>
        </h1>
        <p className="profile-subtitle text-center text-gray-600 mb-8">
          Manage your account settings
        </p>
        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          {/* Profile Navigation */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => navigate('/dashboard')}
              className="px-6 py-4 text-gray-600 hover:text-red-400 font-medium"
            >
              My Recipes
            </button>
            <button className="px-6 py-4 text-red-400 border-b-2 border-red-400 font-medium">
              Profile Settings
            </button>
          </div>
          
          <div className="p-6">
            {/* User Info */}
            <div className="mb-8 profile-info">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Username</p>
                    <p className="font-medium">{user.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Account Created</p>
                    <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Change Password Form */}
            <div className="password-form">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Change Password</h2>
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                  {success}
                </div>
              )}
              
              <form onSubmit={handlePasswordChange}>
                <div className="mb-4">
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
            
            {/* Logout Button */}
            <div className="mt-12 pt-6 border-t border-gray-200">
              <button
                onClick={() => {
                  logout();
                  navigate('/login');
                }}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
