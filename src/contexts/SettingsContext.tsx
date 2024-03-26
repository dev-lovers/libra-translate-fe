import React, { createContext, useState, useContext, ReactNode } from "react";

interface SettingsContextType {
  theme: string;
  toggleTheme: () => void;
  isStatusBarHidden: boolean;
  toggleStatusBar: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
  undefined
);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isStatusBarHidden, setIsStatusBarHidden] = useState<false | true>(
    false
  );

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const toggleStatusBar = () => {
    setIsStatusBarHidden(!isStatusBarHidden);
  };

  return (
    <SettingsContext.Provider
      value={{ theme, toggleTheme, isStatusBarHidden, toggleStatusBar }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
