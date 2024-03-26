import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  email: string;
  unavailableScreens: number[];
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  userIsLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean>(false);

  const login = (userData: User) => {
    setUser(userData);
    setUserIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setUserIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
