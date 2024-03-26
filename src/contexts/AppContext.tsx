import React from "react";
import { AuthProvider } from "./AuthContext";
import { SettingsProvider } from "./SettingsContext";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <SettingsProvider>
      <AuthProvider>{children}</AuthProvider>
    </SettingsProvider>
  );
};
