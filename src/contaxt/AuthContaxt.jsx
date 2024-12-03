import React, { createContext, useState, useContext } from 'react';

// Create a Context for the authentication state
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    role: localStorage.getItem('role') || null,
    errorMessage: null,  // Add errorMessage state
    successMessage: null, // Add successMessage state
  });

  // Set the authentication data in local storage and update the state
  const setAuthData = (token, user, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('role', role);
    setAuthState({ ...authState, token, user, role });
  };

  // Set the error and success messages
  const setErrorMessage = (message) => {
    setAuthState((prevState) => ({
      ...prevState,
      errorMessage: message,
    }));
  };

  const setSuccessMessage = (message) => {
    setAuthState((prevState) => ({
      ...prevState,
      successMessage: message,
    }));
  };

  // Clear the authentication data (logout)
  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setAuthState({
      token: null,
      user: null,
      role: null,
      errorMessage: null,
      successMessage: null,
    });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthData, clearAuthData, setErrorMessage, setSuccessMessage }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
