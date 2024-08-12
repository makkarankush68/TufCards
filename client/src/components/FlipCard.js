"use client";
import AppContext from "@/context/AppContext";
import { useContext, useState } from "react";
import ReactCardFlip from "react-card-flip";

const FlipCard = ({ card }) => {
  const { isFlipped, setIsFlipped } = useContext(AppContext);
  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  if (!card) return <h1 className="text-center">No cards found</h1>;

  return (
    <div className="m-4 p-4 border border-slate-500 rounded-lg max-w-[100vw] overflow-clip cursor-pointer">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front side */}
        <div className="max-w-screen" onClick={handleClick}>
          <div>
            <h1 className="text-2xl font-bold pl-2">{card.question}</h1>
            <div className="grid  grid-cols-1 sm:grid-cols-2 text-center ">
              {card.options.map((option, idx) => (
                <span
                  key={idx}
                  className="m-2 p-2 bg-gray-700 text-white rounded-lg"
                >
                  {option.text}
                </span>
              ))}
            </div>
          </div>
        </div>
        {/* Back side */}
        <div
          className="max-w-[100vw] min-h-7 max-h-[70vh] overflow-y-auto"
          onClick={handleClick}
        >
          <h2 className="text-2xl font-bold">{card?.answer[0]?.heading}</h2>
          <p className="max-h-[100%]">{card?.answer[0]?.paragraph}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
