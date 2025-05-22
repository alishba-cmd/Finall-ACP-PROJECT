import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for debugging
api.interceptors.request.use(
  config => {
    console.log('API Request:', {
      method: config.method.toUpperCase(),
      url: config.url,
      data: config.data,
      headers: config.headers
    });
    return config;
  },
  error => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  response => {
    console.log('API Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  error => {
    console.error('API Response Error:', error);
    return Promise.reject(error);
  }
);

export const loginUser = async (userData) => {
  try {
    console.log('Logging in user:', userData);
    const res = await api.post('/auth/login', userData);
    console.log('Login successful:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getRecipes = async () => {
  try {
    const res = await api.get('/recipes');
    return res.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const res = await api.get(`/recipes/${id}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching recipe with id ${id}:`, error);
    throw error;
  }
};

export const addRecipe = async (data, token) => {
  try {
    console.log('Sending recipe data to API:', data);
    const res = await api.post('/recipes', data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('API response for adding recipe:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

// Get recipes created by the logged-in user
export const getUserRecipes = async (token) => {
  try {
    console.log('Fetching user recipes with token:', token);
    const res = await api.get('/recipes/user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('User recipes response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error fetching user recipes:', error);
    throw error;
  }
};

// Update an existing recipe
export const updateRecipe = async (id, data, token) => {
  try {
    const res = await api.put(`/recipes/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating recipe with id ${id}:`, error);
    throw error;
  }
};

// Delete a recipe
export const deleteRecipe = async (id, token) => {
  try {
    const res = await api.delete(`/recipes/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.error(`Error deleting recipe with id ${id}:`, error);
    throw error;
  }
};

// Update user password
export const updatePassword = async (currentPassword, newPassword, token) => {
  try {
    const res = await api.put('/auth/update-password',
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};

export default api; // ✅ Now you're exporting `api` as default
