import { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const steps = [
    "Enter your email",
    "Enter your password",
    "Let's get back into the action."
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleNextStep();
    } else if (e.key === "ArrowRight") {
      handleNextStep();
    } else if (e.key === "ArrowLeft") {
      handlePreviousStep();
    }
  };

  const handleNextStep = () => {
    if (inputValue.trim() !== "" || currentStep === 0) {
      setInputValue("");
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setInputValue("");
    }
  };

  return (
    <div className={`flex flex-row w-full justify-center items-center h-screen ${currentStep === 2? "text-center" : "text-left"} bg-black text-white px-6 md:px-20`}>
      <div className='w-5/12 flex flex-col'>
        <h1 className="text-3xl md:text-4xl mb-4">{currentStep === 2 ? "Logged In!" :"Welcome back!"}</h1>

        {currentStep < 2 ? (
          <>
            <h2 className="text-sm md:text-base font-serif italic opacity-75 mb-6">
              {steps[currentStep]}
            </h2>

            <input
              type={currentStep === 1 ? "password" : "text"}
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="gradient"
              autoFocus
            />
          </>
        ) : (
          <h2 className="text-sm md:text-base font-serif italic opacity-75 mb-6">
            Let's get back into the action.
          </h2>
        )}

        <div className='flex flex-row justify-between'>
          {currentStep !== 2 ? 
          <div className="flex justify-start mt-4 space-x-2">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep ? "bg-white" : "bg-gray-500"
                  }`}
                />
              ))}
          </div>
          : <div></div>}
          <div>
            {currentStep === 1 && (
              <div className='space-x-1 pt-1'>
                <span className="text-xs font-serif italic md:text-sm text-gray-400 mt-2">Forgot your password?</span>
                <Link
                  to="/reset-password"
                  className="text-xs italic md:text-sm text-gray-400 underline cursor-pointer mt-2"
                  style={{ marginTop: "1rem" }}
                >
                  Reset it.
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
