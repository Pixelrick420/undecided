import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import "./tick.css";

export const AnimationPage = () => {
  const [animationFinished, setAnimationFinished] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const finalText = queryParams.get("text") || "You're ready to go";

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
