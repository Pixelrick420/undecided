import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [generatedID, setGeneratedID] = useState("");
  const [elements, setElements] = useState([]);
  const [isEventValid, setIsEventValid] = useState(false);
  const navigate = useNavigate();

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

  const handleNavigateToEvent = () => {
    navigate(`/events/${eventCode}`);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-6 md:px-20">
      <div className="w-5/12 flex flex-col items-start">
        <h1 className="text-4xl text-left mb-4">
          {currentStep === 0 ? "Let's get going!" : "Accessing Event Form"}
        </h1>

        {currentStep === 0 ? (
          <>
            <h2 className="text-lg opacity-75 font-sans mb-6">
              {steps[currentStep]}
            </h2>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="bg-gray-100 text-black p-3 rounded-md w-full mb-4"
              placeholder="Enter your event code"
              autoFocus
            />
          </>
        ) : isEventValid ? (
          <div className="w-full">
            <h2 className="text-lg opacity-75 font-sans mb-6">
              Fill out the event form
            </h2>
            {elements.map((element) => (
              <div
                key={element.id}
                className={`p-4 rounded-md mb-4 ${getElementClass(
                  element.type
                )}`}>
                <label className="text-lg font-semibold">{element.value}</label>
                {element.type === "text" && (
                  <input
                    type="text"
                    className="mt-2 w-full p-2 rounded-md bg-gray-100 text-black"
                  />
                )}
                {element.type === "checkbox" && (
                  <div className="flex flex-col mt-2">
                    {element.options.map((option, idx) => (
                      <label
                        key={idx}
                        className="flex items-center space-x-2 mb-2">
                        <input
                          type="radio"
                          name={`checkbox-group-${element.id}`} // ensures only one selection per group
                          className="form-radio text-black"
                        />
                        <span className="text-base">{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={handleNavigateToEvent}
              className="bg-blue-600 text-white px-6 py-2 rounded-md absolute bottom-8 right-8 hover:bg-blue-500 transition duration-200">
              Next
            </button>
          </div>
        ) : (
          <p className="text-red-500 text-lg">Invalid event code.</p>
        )}
      </div>
    </div>
  );
};
