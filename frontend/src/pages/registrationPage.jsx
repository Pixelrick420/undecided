import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [generatedID, setGeneratedID] = useState("");
  const steps = [
    "Enter your event code",
    "You can access this along with the complete pass from your profile",
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

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
    if (currentStep === 0 && inputValue.trim() !== "") {
      setEventCode(inputValue);
      setGeneratedID(generateUniqueID());
      setCurrentStep((prev) => prev + 1);
      setInputValue("");
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setInputValue("");
    }
  };

  const generateUniqueID = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return `${result}`;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-6 md:px-20">
      <div className="w-6/12">
        <h1 className="text-3xl md:text-4xl mb-4">
          {currentStep == 0 ? "Lets get going!" : "Generating your Unique ID"}
        </h1>

        {currentStep === 0 ? (
          <>
            <h2 className="text-sm md:text-base font-serif italic opacity-75 mb-6">
              {steps[currentStep]}
            </h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="gradient mb-2 w-1/2"
              autoFocus
            />
          </>
        ) : (
          <>
            <h2 className="text-[3vh] md:text-base font-serif italic opacity-75 mb-6">
              {steps[currentStep]}
            </h2>
            <div className="gradient flex flex-row items-center justify-center items-center md:text-4xl mb-4">
              {"7DHD-" + generatedID}
            </div>
          </>
        )}

        <div className="flex flex-row justify-center items-center w-full">
          <div className="flex justify-start mt-4 space-x-2">
            {Array(steps.length)
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
        </div>
      </div>
    </div>
  );
};
