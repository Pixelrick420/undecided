import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./tick.css";

const AnimationComponent = ({ finalText }) => {
  const [animationFinished, setAnimationFinished] = useState(false);

  const fireConfetti = () => {
    confetti({
      particleCount: 10,
      spread: 100,
      origin: { y: 0.5 },
      colors: ["#FFFFFF"],
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fireConfetti();
      setAnimationFinished(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <header className="header"></header>
      <main className="flex flex-wrap justify-center items-center gap-8 text-4xl font-sans">
        <div class="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
          <span class="sr-only">Loading...</span>
          <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div class="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div class="h-8 w-8 bg-black rounded-full animate-bounce"></div>
        </div>
        {!animationFinished && (
          <div className="relative flex justify-center items-center w-12 h-12 text-white">
            <div className="absolute w-12 h-12 rounded-full bg-white animate-loader-expand"></div>
            <div className="absolute w-12 h-12 rounded-full bg-white opacity-0 animate-loader-explode"></div>
            <div className="tick absolute h-5 w-2.5 inline-block transform rotate-45 border-b-4 border-r-4 border-black"></div>
          </div>
        )}
        {animationFinished && <h1>{finalText}</h1>}
      </main>
    </div>
  );
};

export default AnimationComponent;
