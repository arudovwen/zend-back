// utils/sessionUtils.js

// Function to get an item from sessionStorage
export const getSessionItem = (key) => {
    const data = typeof window !== 'undefined' ? sessionStorage.getItem(key) : '';
    
    try {
      return JSON.parse(data);
    } catch (err) {
      return data;
    }
  };
  
  // Function to set an item in sessionStorage
  export const setSessionItem = (key, value) => {
    if (typeof window !== 'undefined') {
      const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
      sessionStorage.setItem(key, stringify);
    }
  };
  
  // Function to remove an item from sessionStorage
  export const removeSessionItem = (key) => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  };
  