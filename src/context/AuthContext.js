import React, { useState, useContext, createContext } from 'react';

// Create Authentication Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize without a user so login screen appears
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = (email, password, userType) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock user data based on userType
      const userData = {
        id: '123',
        name: 'John Doe',
        email: email,
        userType: 'consumer', // Always consumer for CareerBooster
      };
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  };

  const register = (name, email, password, userType) => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      const userData = {
        id: '123',
        name: name,
        email: email,
        userType: 'consumer', // Always consumer for CareerBooster
      };
      setUser(userData);
      setIsLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use authentication context
export function useAuth() {
  return useContext(AuthContext);
} 