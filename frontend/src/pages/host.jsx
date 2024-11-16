import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { setDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; // Ensure firebase is correctly initialized
import { HomeComponent } from "./home"; // Adjust the HomeComponent import as necessary

const generateUniqueID = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return `${result}`;
};

const EVENTID = generateUniqueID() + "-" + generateUniqueID();

export const HostPage = () => {
  const questions = [
    "What's your event called?",
    "Provide a brief description of your event",
    "Set up your registration form",
    "Here is your event code, please share it with all your participants!",
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [elements, setElements] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [showHome, setShowHome] = useState(false);

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (currentQuestion === 3) {
      setShowHome(true);
    } else if (e.key === "Enter" && inputValue.trim() !== "") {
      handleNextQuestion();
    } else if (e.key === "ArrowRight") {
      handleNextQuestion();
    } else if (e.key === "ArrowLeft") {
      handlePreviousQuestion();
    }
  };

  const handleNextQuestion = () => {
    if (inputValue.trim() !== "" || currentQuestion === 0) {
      if (currentQuestion === 0) {
        setEventName(inputValue); // Set event name
      } else if (currentQuestion === 1) {
        setEventDescription(inputValue); // Set event description
      }

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

  const handleArrowClick = () => {
    setShowHome(true);
  };

  if (showHome) {
    return <HomeComponent />;
  }

  return (
    <div className="flex flex-row w-full justify-center items-center h-screen text-left bg-black text-white px-6 md:px-20">
      {currentQuestion !== 2 ? (
        <div className="w-6/12 flex flex-col">
          <h1 className="text-3xl md:text-4xl mb-4">
            {currentQuestion !== 3
              ? "Let's set up your Event."
              : "Generating your Unique ID"}
          </h1>

          <h2 className="text-sm md:text-base font-sans italic opacity-75 mb-6">
            {questions[currentQuestion]}
          </h2>

          {currentQuestion !== 3 && (
            <input
              type="text"
              className="p-2 rounded-md w-full text-black bg-gray-100 gradient"
              placeholder={
                currentQuestion === 0
                  ? "Enter event name"
                  : "Enter event description"
              }
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
          )}

          {currentQuestion === 3 && (
            <div>
              <div className="gradient">{EVENTID}</div>

              <div className="mt-6 absolute bottom-6 right-6 flex space-x-4">
                <button
                  className="bg-black text-white py-2 px-4 rounded-full flex items-center justify-center"
                  onClick={handleArrowClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-14 w-16"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth="2">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14m-7-7l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <RegistrationForm
          setElements={setElements}
          elements={elements}
          setCurrentQuestion={setCurrentQuestion}
          eventName={eventName}
          eventDescription={eventDescription}
        />
      )}
    </div>
  );
};

const RegistrationForm = ({
  setElements,
  elements,
  setCurrentQuestion,
  eventName,
  eventDescription,
}) => {
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

  const handleSelectChange = (e) => setSelectedElement(e.target.value);

  const handleAddElement = () => {
    if (selectedElement && inputValue.trim()) {
      let newElement = {
        id: uuidv4(),
        type: selectedElement,
        value: inputValue,
      };

      if (selectedElement === "checkbox" && checkboxOptions.trim()) {
        const optionsArray = checkboxOptions.split(" ").filter(Boolean);
        const hasDuplicates =
          new Set(optionsArray).size !== optionsArray.length;
        if (hasDuplicates) {
          alert("Please enter unique checkbox options.");
          return;
        }
        newElement.options = optionsArray;
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

  const handleCreateEvent = async () => {
    try {
      if (!eventName || !eventDescription) {
        console.error("Event name or description is missing!");
        return;
      }

      const eventRef = doc(db, "events", EVENTID);

      await setDoc(eventRef, {
        id: EVENTID,
        name: eventName,
        description: eventDescription,
        elements: elements,
        participants: [],
      });

      const participants = [
        {
          email: "",
          joinedAt: new Date().toISOString(),
          name: "",
        },
      ];

      await setDoc(doc(eventRef, "participants", "templateParticipant"), {
        participants: participants,
      });

      setCurrentQuestion(3);
    } catch (error) {
      console.error("Error creating event:", error);
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
    <div className="flex flex-col w-6/12 items-start justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl text-left mb-4">Let’s set up your Event.</h1>
      <p className="text-lg opacity-75 font-sans mb-6">
        Set up your registration form.
      </p>

      <div className="w-full space-y-4">
        {elements.map((element, index) => (
          <div
            key={element.id}
            className={`p-4 rounded-md cursor-pointer ${getElementClass(
              element.type
            )}`}
            onClick={() => handleEditElement(index)}>
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

        <div className="flex justify-between w-full items-center ">
          <input
            type="text"
            className="p-2 w-full rounded-md text-black gradient"
            placeholder={`Enter ${selectedElement} prompt`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <select
            className="p-2 rounded-md ml-5 text-black gradient"
            value={selectedElement}
            onChange={handleSelectChange}>
            {elementOptions.map((option) => (
              <option
                key={option.value}
                value={option.value}
                className="bg-gray-700 text-white ">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {selectedElement === "checkbox" && (
          <div className="mt-4 w-full">
            <input
              type="text"
              className="p-2 w-full rounded-md text-black gradient "
              placeholder="Enter checkbox options separated by spaces"
              value={checkboxOptions}
              onChange={(e) => setCheckboxOptions(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="mt-6 absolute bottom-6 right-6 flex space-x-4">
        <button
          className="bg-black text-white py-2 px-4 rounded-full border-white border-2"
          onClick={handleAddElement}>
          Add Element
        </button>
        <button
          className="bg-white text-black py-2 px-4  rounded-full"
          onClick={handleCreateEvent}>
          Create Event
        </button>
      </div>
    </div>
  );
};
