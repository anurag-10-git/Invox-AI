import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useContext } from "react";


const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within as AuthProvider')
  }

  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      // setLoading(true);
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Auth check failed', error);
    } finally {
      setLoading(false)
    }
  }

  const login = (userData, token) => {
    console.log(userData, token)
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));

    console.log(userData, token)
    setUser(userData);
    setIsAuthenticated(true);
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setIsAuthenticated(false);
    window.location.href = '/'
  }

  const updateUser = (updateUserData) => {
    const newUserData = { ...user, ...updateUserData };
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}