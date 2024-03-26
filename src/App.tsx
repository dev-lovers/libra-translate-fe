import React from "react";
import { AppProvider } from "./contexts/AppContext";
import Navigation from "./navigation/Navigation";

export default function App() {
  return (
    <AppProvider>
      <Navigation />
    </AppProvider>
  );
}
