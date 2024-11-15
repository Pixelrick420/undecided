import { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { useNavigate } from "react-router-dom";

export const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [eventCode, setEventCode] = useState("");
  const [elements, setElements] = useState([]);
  const [isEventValid, setIsEventValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const steps = [
    "Enter your event code",
    "You can access this along with the complete pass from your profile",
  ];

  useEffect(() => {
    fetchUserName();
  }, []);

  const fetchUserName = async () => {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          setName(docSnap.data().name);
          setEmail(user.email);
        }
      } catch (error) {
        console.error("Error fetching user name:", error);
      }
    }
  };

  const handleInputChange = (e) => setInputValue(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") handleNextStep();
    else if (e.key === "ArrowRight") handleNextStep();
    else if (e.key === "ArrowLeft") handlePreviousStep();
  };

  const handleNextStep = async () => {
    if (loading) return;
    if (currentStep === 0 && inputValue.trim() !== "") {
      setLoading(true);
      if (!isEventValid || eventCode !== inputValue) {
        const isValid = await verifyEventCode(inputValue);
        if (isValid) {
          setEventCode(inputValue);
          setCurrentStep((prev) => prev + 1);
          setInputValue("");
        } else alert("Invalid event code. Please try again.");
      } else setCurrentStep((prev) => prev + 1);
      setLoading(false);
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
        setElements(eventDoc.data().elements || []);
        setIsEventValid(true);
        return true;
      } else {
        setElements([]);
        setIsEventValid(false);
        return false;
      }
    } catch (error) {
      setIsEventValid(false);
      return false;
    }
  };

  const checkIfAlreadyRegistered = async (eventCode) => {
    const eventDocRef = doc(db, "events", eventCode);
    const eventDocSnap = await getDoc(eventDocRef);
    const participantEmails = eventDocSnap.data()?.participantEmails || [];
    return participantEmails.includes(email);
  };

  const handleNavigateToEvent = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const alreadyRegistered = await checkIfAlreadyRegistered(eventCode);
      if (alreadyRegistered) {
        alert("You are already registered for this event.");
        return;
      }

      const eventRef = doc(db, "events", eventCode);

      const participantData = {
        name,
        email,
        joinedAt: serverTimestamp(),
      };

      await updateDoc(eventRef, {
        participants: arrayUnion({
          name: participantData.name,
          email: participantData.email,
          joinedAt: new Date().toISOString(),
        }),
        participantEmails: arrayUnion(email),
      });

      navigate(`/events/${eventCode}/participants`);
    } catch (error) {
      console.error("Error adding participant:", error);
      alert("Unable to join the event. Please try again.");
    } finally {
      setLoading(false);
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
      <div className="w-full md:w-6/12 flex flex-col items-start">
        <h1 className="text-4xl text-left mb-4">
          {currentStep === 0 ? "Let's get going!" : "Accessing Event Form"}
        </h1>
        {currentStep === 0 ? (
          <>
            <label
              htmlFor="eventCodeInput"
              className="text-lg opacity-75 font-sans mb-6">
              {steps[currentStep]}
            </label>
            <input
              id="eventCodeInput"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
              className="gradient w-full p-2 rounded-md text-black"
              autoFocus
              aria-label="Event Code"
            />
          </>
        ) : isEventValid ? (
          <div className="w-full">
            <h2 className="text-lg opacity-75 font-sans mb-6">
              Fill out the event form
            </h2>
            {elements.length > 0 ? (
              elements.map((element) => (
                <div
                  key={element.id}
                  className={`p-4 rounded-md mb-4 ${getElementClass(
                    element.type
                  )}`}>
                  <label className="text-lg font-semibold">
                    {element.value}
                  </label>
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
                            name={`checkbox-group-${element.id}`}
                            className="form-radio text-black"
                          />
                          <span className="text-base">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-yellow-400">
                No elements found for this event.
              </p>
            )}
            <div className="flex justify-end mt-4">
              <button
                onClick={handleNavigateToEvent}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500 transition duration-200">
                Next
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-lg">Invalid event code.</p>
        )}
      </div>
    </div>
  );
};
