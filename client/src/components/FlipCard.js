"use client";
import AppContext from "@/context/AppContext";
import { useContext, useState } from "react";
import ReactCardFlip from "react-card-flip";
import Confetti from "react-confetti";

const FlipCard = ({ card }) => {
  const { isFlipped, setIsFlipped } = useContext(AppContext);
  const [celebrate, setCelebrate] = useState(false);
  const [wrong, setWrong] = useState(false);

  if (!card) return <h1 className="text-center">No cards found</h1>;

  const handleClick = () => {
    if (card.options.length <= 0) {
      return setIsFlipped(!isFlipped);
    }
  };

  const handleOption = (e, option) => {
    if (option?.isCorrect) {
      setCelebrate(true);
      setTimeout(() => {
        setCelebrate(false);
      }, 2000);
    } else {
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
      }, 3000);
    }
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className={
        "relative m-4 p-4 border  rounded-lg max-w-[100vw] overflow-clip cursor-pointer" +
        (wrong ? " border-red-400" : " border-slate-500")
      }
    >
      {celebrate && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front side */}
        <div className="max-w-screen" onClick={handleClick}>
          <div>
            <h1 className="text-2xl font-bold pl-2">
              {`# `}
              {card.question}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 text-center">
              {card.options.map((option, idx) => (
                <button
                  onClick={(e) => handleOption(e, option)}
                  key={idx}
                  className="m-2 p-2 bg-gray-700 text-white rounded-lg"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        </div>
        {/* Back side */}
        <div
          className="max-w-[100vw] min-h-7 max-h-[70vh] overflow-y-auto"
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <h2 className="text-2xl font-bold">{card?.answer[0]?.heading}</h2>
          <p className="max-h-[100%]">{card?.answer[0]?.paragraph}</p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
