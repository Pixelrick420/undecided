import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [generatedID, setGeneratedID] = useState("");
  const [elements, setElements] = useState([]);
  const [isEventValid, setIsEventValid] = useState(false);

  const steps = [
    "Enter your event code",
    "You can access this along with the complete pass from your profile",
  ];

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

  const handleNextStep = async () => {
    if (currentStep === 0 && inputValue.trim() !== "") {
      const isValid = await verifyEventCode(inputValue);
      if (isValid) {
        setEventCode(inputValue);
        setCurrentStep((prev) => prev + 1);
        setInputValue("");
      } else {
        alert("Invalid event code. Please try again.");
      }
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setInputValue("");
    }
  };

  const verifyEventCode = async (code) => {
    try {
      const q = query(collection(db, "events"), where("id", "==", code));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const eventDoc = querySnapshot.docs[0];
        setElements(eventDoc.data().elements);
        setIsEventValid(true);
        return true;
      } else {
        setIsEventValid(false);
        return false;
      }
    } catch (error) {
      console.error("Error fetching event:", error);
      setIsEventValid(false);
      return false;
    }
  };

  const getElementClass = (type) => {
    switch (type) {
      case "text":
        return "bg-blue-600";
      case "checkbox":
        return "bg-green-600";
      case "payment":
        return "bg-yellow-500";
      default:
        return "bg-pink-600";
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-6 md:px-20">
      <div className="w-6/12">
        <h1 className="text-3xl md:text-4xl mb-4">
          {currentStep === 0 ? "Let's get going!" : "Accessing Event Form"}
        </h1>

        {currentStep === 0 ? (
          <>
            <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
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
        ) : isEventValid ? (
          <div>
            <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
              Fill out the event form
            </h2>
            {elements.map((element) => (
              <div
                key={element.id}
                className={`mb-4 p-4 rounded-md ${getElementClass(
                  element.type
                )}`}>
                <label className="text-lg">{element.value}</label>
                {element.type === "text" && (
                  <input
                    type="text"
                    className="p-2 w-full bg-gray-100 rounded-md mt-2"
                  />
                )}
                {element.type === "checkbox" && (
                  <div className="flex flex-col mt-2">
                    {element.options.map((option, idx) => (
                      <label key={idx} className="flex items-center space-x-2">
                        <input type="checkbox" className="form-checkbox" />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
                {/* Add other form types as needed */}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-red-500">Invalid event code.</p>
        )}
      </div>
    </div>
  );
};
