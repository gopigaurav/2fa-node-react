import React, { createContext, useContext, useEffect, useState } from 'react';

// Creating the Session Context
const SessionContext = createContext();

// Custom hook to use session context
export const useSession = () => {
  return useContext(SessionContext);
};

// SessionProvider component to manage user session
export const SessionProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"))
    if (storedUser) {
      setUser(storedUser)
      setIsLoggedIn(true)
    }
    setLoading(false)
  }, [])

  // Login function to set session
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
    sessionStorage.setItem('user', JSON.stringify(userData))
  };

  // Logout function to clear session
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    sessionStorage.removeItem("user")
  };

  return (
    <SessionContext.Provider value={{ isLoggedIn, loading, user, login, logout }}>
      {children}
    </SessionContext.Provider>
  );
};
