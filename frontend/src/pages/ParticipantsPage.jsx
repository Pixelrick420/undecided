import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const ParticipantsPage = () => {
  const { eventId } = useParams();
  const [participants, setParticipants] = useState([]);
  const [eventName, setEventName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDocRef = doc(db, "events", eventId);
        const eventDocSnap = await getDoc(eventDocRef);

        if (eventDocSnap.exists()) {
          const eventData = eventDocSnap.data();
          setEventName(eventData.name || "Event Name Not Available");
          setParticipants(eventData.participants || []);
        } else {
          console.error("Event not found");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchEventData();
  }, [eventId]);

  const handleArrowClick = () => {
    navigate("/home");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white px-6 md:px-20">
      <div className="w-full md:w-6/12 flex flex-col items-start">
        <h1 className="text-4xl mb-6 text-left">
          Participants for Event {eventName}
        </h1>
        {participants.length === 0 ? (
          <p className="text-yellow-400">No participants found</p>
        ) : (
          <ul className="w-full">
            {participants.map((participant, index) =>
              participant.name ? (
                <li
                  key={index}
                  className="p-4 bg-blue-600 rounded-md mb-4 text-white text-lg font-semibold">
                  {participant.name}
                </li>
              ) : null
            )}
          </ul>
        )}
      </div>

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
  );
};

export { ParticipantsPage };
