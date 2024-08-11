"use client";
import { useState } from "react";
import ReactCardFlip from "react-card-flip";
const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };
  return (
    <div className="m-4 p-4 border border-slate-500 rounded-lg max-w-[100vw] overflow-clip ">
      <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        {/* Front side */}
        <div className="max-w-screen" onClick={handleClick}>
          <div>
            <h1>What is useContext?</h1>
            <div className="grid  grid-cols-1 sm:grid-cols-2 text-center ">
              <span>a) Option</span>
              <span>b) Option</span>
              <span>c) Option</span>
              <span>d) Option</span>
            </div>
          </div>
        </div>
        {/* Back side */}
        <div
          className="max-w-[100vw] max-h-[70vh] overflow-y-scroll"
          onClick={handleClick}
        >
          <h2>UseContext Hook</h2>
          <p className="max-h-[100%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default FlipCard;
