import { useState, useEffect } from "react";
import "./tick.css";

const AnimationComponent = ({ finalText }) => {
  const [firstAnimationCount, setFirstAnimationCount] = useState(0);
  const [animation1Finished, setAnimation1Finished] = useState(false);
  const [animation2Finished, setAnimation2Finished] = useState(false);

  useEffect(() => {
    if (firstAnimationCount < 3) {
      const interval = setInterval(() => {
        setFirstAnimationCount((prevCount) => prevCount + 1);
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setAnimation1Finished(true);
    }
  }, [firstAnimationCount]);

  useEffect(() => {
    if (animation1Finished) {
      setTimeout(() => {
        setAnimation2Finished(true);
      }, 1000);
    }
  }, [animation1Finished]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <header className="header"></header>
      <main className="flex flex-wrap justify-center items-center gap-8 text-4xl font-sans">
        {!animation1Finished && (
          <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
            <span className="sr-only">Loading...</span>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
          </div>
        )}

        {animation1Finished && !animation2Finished && (
          <div className="relative flex justify-center items-center w-12 h-12 text-white">
            <div className="absolute w-12 h-12 rounded-full bg-white animate-loader-expand"></div>
            <div className="absolute w-12 h-12 rounded-full bg-white opacity-0 animate-loader-explode"></div>
            <div className="tick absolute h-5 w-2.5 inline-block transform rotate-45 border-b-4 border-r-4 border-black"></div>
          </div>
        )}

        {animation2Finished && <h1>{finalText}</h1>}
      </main>
    </div>
  );
};

export default AnimationComponent;
