// import axios from "axios";

// const api = axios.create({
//     baseURL: import.meta.env.VITE_API_URL
// })

// export const login = ({email,password}) =>{
//    return api.post('/login/',{email,password})
// }


import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // If already refreshing, add to queue
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      
      if (!refreshToken) {
        // No refresh token available, clear everything
        clearAuthentication();
        return Promise.reject(error);
      }

      try {
        // Call your refresh token endpoint - adjust this URL to match your API
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access: newAccessToken, refresh: newRefreshToken } = response.data;

        // Update tokens using the context functions
        updateTokens({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken || refreshToken
        });

        // Update authorization header
        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // Process queued requests
        processQueue(null, newAccessToken);

        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear tokens
        clearAuthentication();
        
        // Process queued requests with error
        processQueue(refreshError, null);
        
        // Redirect to login page or show login modal
        window.dispatchEvent(new Event("authenticationFailed"));
        
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// Helper functions to interact with the context
const updateTokens = (tokens) => {
  // Import the context functions dynamically to avoid circular dependencies
  import('../context/').then(module => {
    module.setTokens(tokens);
  }).catch(error => {
    console.error('Failed to update tokens in context:', error);
    // Fallback: update localStorage directly
    localStorage.setItem("accessToken", tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem("refreshToken", tokens.refreshToken);
    }
  });
};

const clearAuthentication = () => {
  // Import the context functions dynamically to avoid circular dependencies
  import('../context').then(module => {
    module.clearTokens();
  }).catch(error => {
    console.error('Failed to clear tokens in context:', error);
    // Fallback: clear localStorage directly
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
};

// Export API methods
export const login = ({ email, password }) => {
  return api.post('/login/', { email, password });
};

// Example protected API calls
export const getProtectedData = () => {
  return api.get('/protected-endpoint/');
};

export const postData = (data) => {
  return api.post('/data/', data);
};

export const getUserProfile = () => {
  return api.get('/user/profile/');
};

// Logout function
export const logout = () => {
  clearAuthentication();
  delete api.defaults.headers.common.Authorization;
};

export default api;