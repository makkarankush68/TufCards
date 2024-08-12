"use client";
import { superfetch } from "@/libs/utils";
import { createContext, useState, useEffect } from "react";
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState(null);
  const [loading, setLoading] = useState(true);
  const [idx, setIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);


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
    loading,
    idx,
    setIdx,
    isFlipped,
    setIsFlipped,
  };
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};

export default AppContext;
