import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [usersDb, setUsersDb] = useState([
    { username: 'admin', password: 'admin123' }
  ]);

  // Check for saved session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('valkey_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username, password) => {
    const foundUser = usersDb.find(u => u.username === username && u.password === password);
    if (foundUser) {
      setUser({ username: foundUser.username });
      localStorage.setItem('valkey_user', JSON.stringify({ username: foundUser.username }));
      return { success: true };
    }
    return { success: false, message: 'Invalid username or password' };
  };

  const register = (username, email, password) => {
    const userExists = usersDb.find(u => u.username === username);
    if (userExists) {
      return { success: false, message: 'Username already exists' };
    }
    
    const newUser = { username, email, password };
    setUsersDb([...usersDb, newUser]);
    
    // Auto login after register
    setUser({ username });
    localStorage.setItem('valkey_user', JSON.stringify({ username }));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('valkey_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
