import React, { createContext, useState, useContext, ReactNode } from "react";

interface User {
  token: string | null;
  id: number | null;
  name: string;
  email: string | null;
  unavailableScreens: number[] | null;
}

interface AuthContextType {
  authenticate: (userData: User) => void;
  user: User | null;
  userIsLoggedIn: boolean | null;
  updateUserField: (field: keyof User, value: User[keyof User]) => void;
  deauthenticate: (value?: boolean) => void;
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
  const [userIsLoggedIn, setUserIsLoggedIn] = useState<boolean | null>(null);

  const authenticate = (userData: User) => {
    setUser(userData);
    setUserIsLoggedIn(true);
  };

  const updateUserField = (field: keyof User, value: User[keyof User]) => {
    if (user) {
      setUser({ ...user, [field]: value });
    }
  };

  const deauthenticate = (value?: boolean) => {
    setUser(null);
    setUserIsLoggedIn(value ?? null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        user,
        userIsLoggedIn,
        updateUserField,
        deauthenticate,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
