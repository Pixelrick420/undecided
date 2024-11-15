import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./tick.css";

const AnimationComponent = ({ finalHeading, finalText, redirect }) => {
  const [animationStage, setAnimationStage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setAnimationStage(1), 3000),
      setTimeout(() => setAnimationStage(2), 4000),
      setTimeout(() => navigate(redirect), 5000),
    ];

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [navigate, redirect]);

  return (
    <div className="flex justify-center items-center w-full h-screen bg-black">
      <main className="flex flex-wrap justify-center items-center gap-8 text-4xl font-sans">
        {animationStage === 0 && (
          <div className="flex space-x-2 justify-center items-center bg-white h-screen dark:invert">
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-duration:1s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.3s]"></div>
            <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-duration:1s] [animation-delay:0.6s]"></div>
          </div>
        )}

        {animationStage === 1 && (
          <div className="relative flex justify-center items-center w-12 h-12 text-white">
            <div className="absolute w-12 h-12 rounded-full bg-white animate-loader-expand"></div>
            <div className="absolute tick h-5 w-2.5 inline-block transform rotate-45 border-b-4 border-r-4 border-black"></div>
          </div>
        )}

        {animationStage === 2 && (
          <div className="w-5/9 flex flex-col text-center">
            <h1 className="text-3xl md:text-4xl mb-4">{finalHeading}</h1>
            <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
              {finalText}
            </h2>
          </div>
        )}
      </main>
    </div>
  );
};

export default AnimationComponent;
