"use client";
import { useContext, useState } from "react";
import FlipCard from "./FlipCard";
import AppContext from "@/context/AppContext";

const Main = () => {
  const { flashcards, idx, setIdx, setIsFlipped } = useContext(AppContext);
  if (!flashcards)
    return <h1 className="text-center text-xl">//Loading Cards//</h1>;
  if (flashcards.length === 0)
    return <h1 className="text-center text-xl">No cards found</h1>;
  return (
    <>
      <div className="font-bold text-center w-full text-3xl p-2">
        Card #{idx + 1}
      </div>
      <div className="mx-auto my-auto md:w-[80vw] w-[100vw] h-fit max-h-[90vh]">
        {flashcards &&
          flashcards.map((card, i) => (
            <div className={i == idx ? "" : "hidden"}>
              <FlipCard key={i} card={card} />
            </div>
          ))}
      </div>
      <div className="grid grid-cols-2 ">
        <button
          onClick={() => {
            if (idx > 0) {
              setIdx(idx - 1);
              setIsFlipped(false);
            }
          }}
          disabled={idx === 0}
          className={
            "m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" +
            (idx === 0 ? " cursor-not-allowed opacity-70" : "")
          }
        >
          Prev
        </button>
        <button
          disabled={idx === flashcards.length - 1}
          onClick={() => {
            if (idx < flashcards.length - 1) {
              setIdx(idx + 1);
              setIsFlipped(false);
            }
          }}
          className={
            "m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" +
            (idx === flashcards.length - 1
              ? " cursor-not-allowed opacity-70"
              : "")
          }
        >
          {idx === flashcards.length - 1 ? "Finished" : "Next"}
        </button>
      </div>
    </>
  );
};

export default Main;
