import { useState } from "react";

const RegistrationForm = ({ setElements, elements, setCurrentQuestion }) => {
  const [selectedElement, setSelectedElement] = useState("text");
  const [inputValue, setInputValue] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [checkboxOptions, setCheckboxOptions] = useState("");

  const elementOptions = [
    { value: "text", label: "Text" },
    { value: "checkbox", label: "Checkbox" },
    { value: "payment", label: "Payment" },
    { value: "other", label: "*other type*" },
  ];

  const handleSelectChange = (e) => {
    setSelectedElement(e.target.value);
    setInputValue("");
    setCheckboxOptions("");
  };

  const handleAddElement = () => {
    if (selectedElement && inputValue.trim()) {
      let newElement = { type: selectedElement, value: inputValue };

      if (selectedElement === "checkbox" && checkboxOptions.trim()) {
        newElement.options = checkboxOptions.split(" "); // Split options by spaces
      }

      if (editingIndex !== null) {
        const updatedElements = [...elements];
        updatedElements[editingIndex] = newElement;
        setElements(updatedElements);
        setEditingIndex(null);
      } else {
        setElements([...elements, newElement]);
      }

      setSelectedElement("text");
      setInputValue("");
      setCheckboxOptions("");
    }
  };

  const handleEditElement = (index) => {
    const element = elements[index];
    setSelectedElement(element.type);
    setInputValue(element.value);
    setCheckboxOptions(element.options ? element.options.join(" ") : "");
    setEditingIndex(index);
  };

  const handleCreateEvent = () => {
    console.log("Event Created with elements:", elements);
    setCurrentQuestion(2);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl mb-4">Let’s set up your event.</h1>
      <p className="text-lg italic opacity-75 mb-6">
        Set up your registration form.
      </p>

      <div className="w-full space-y-4">
        {elements.map((element, index) => (
          <div
            key={index}
            className={`p-4 rounded-md cursor-pointer ${
              element.type === "text" ? "bg-blue-600" : "bg-green-600"
            }`}
            onClick={() => handleEditElement(index)}
          >
            <p>{element.value}</p>
            {element.type === "checkbox" && element.options && (
              <div className="ml-4">
                {element.options.map((option, idx) => (
                  <p key={idx}>{option}</p>
                ))}
              </div>
            )}
          </div>
        ))}

        <div className="flex justify-between w-full items-center">
          <input
            type="text"
            className="input"
            placeholder={`Enter ${selectedElement} prompt`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <select
            className="p-2 bg-customLightGray text-white rounded-md w-1/12"
            value={selectedElement}
            onChange={handleSelectChange}
          >
            <option value="" disabled></option>
            {elementOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {selectedElement === "checkbox" && (
          <div className="mt-4 w-full">
            <input
              type="text"
              className="input"
              placeholder="Enter checkbox options separated by spaces"
              value={checkboxOptions}
              onChange={(e) => setCheckboxOptions(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="mt-6 absolute bottom-6 right-6 flex space-x-4">
        <button
          className="bg-white text-black py-2 px-4 rounded-md"
          onClick={handleAddElement}
        >
          Add Element
        </button>
        <button
          className="bg-white text-black py-2 px-4 rounded-md"
          onClick={handleCreateEvent}
        >
          Create Event
        </button>
      </div>
    </div>
  );
};

export const HostPage = () => {
  var errorraised = false; // set this to true if any error like password does not match etc

  const questions = [
    "What's your event called?",
    "Set up your registration form",
    "This is your event code, make sure you share it with all your participants!",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [elements, setElements] = useState([]);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      handleNextQuestion();
    } else if (e.key === "ArrowRight") {
      handleNextQuestion();
    } else if (e.key === "ArrowLeft") {
      handlePreviousQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (inputValue.trim() !== "" || currentQuestion === 0) {
      setInputValue("");
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-row w-full justify-center items-center h-screen text-left bg-black text-white px-6 md:px-20">
      {currentQuestion !== 1 ? (
        <div className="w-5/12 flex flex-col">
          <h1 className="text-3xl md:text-4xl mb-4">
            {currentQuestion !== 2
              ? "Let's set up your Event."
              : "Generating your Unique ID"}
          </h1>

          <h2 className="text-sm md:text-base font-serif italic opacity-75 mb-6">
            {questions[currentQuestion]}
          </h2>

          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className={!errorraised ? "gradient" : "errorgradient"}
            autoFocus
          />

          <div>
            <div className="flex justify-start mt-4 space-x-2">
              {Array(3)
                .fill(0)
                .map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === currentQuestion ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <RegistrationForm
          setElements={setElements}
          elements={elements}
          setCurrentQuestion={setCurrentQuestion}
        />
      )}
    </div>
  );
};
