import axios from 'axios';

// Function to fetch authenticated user data
export const fetchUser = async () => {
  const token = localStorage.getItem('token'); // Get token from localStorage
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get('http://localhost:5000/auth/user', {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response && error.response.status === 403) {
      throw new Error('Access forbidden: Invalid or missing token');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

