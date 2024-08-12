"use client";
import { superfetch } from "@/libs/utils";

const { createContext, useState, useEffect } = require("react");

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCards = async () => {
    const res = await superfetch("flashcards");
    const json = await res.json();
    setFlashcards(json);
  };
  useEffect(() => {
    fetchCards();
  }, []);

  const contextData = {
    flashcards,
    fetchCards,
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default AppContext;
