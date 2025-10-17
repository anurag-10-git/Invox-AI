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
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {

  };

  const login = (userData, token) => {

  };

  const logout = () => {

  }

  const updateUser = (updateUserData) => {

  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider>
      {children}
    </AuthContext.Provider>
  )
}