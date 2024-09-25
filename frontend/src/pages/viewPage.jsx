import React, { useState, useEffect } from "react";

const ViewPage = () => {
  const events = [
    { name: "Event Name 1", status: "Going", color: "bg-green-500" },
    { name: "Event Name 2", status: "Cancelled", color: "bg-red-500" },
    { name: "Event Name 3", status: "Postponed", color: "bg-yellow-500" },
    { name: "Event Name 4", status: "Going", color: "bg-green-500" },
    { name: "Event Name 5", status: "Cancelled", color: "bg-red-500" },
    { name: "Event Name 6", status: "Postponed", color: "bg-yellow-500" },
    { name: "Event Name 7", status: "Going", color: "bg-green-500" },
    { name: "Event Name 8", status: "Cancelled", color: "bg-red-500" },
    { name: "Event Name 9", status: "Postponed", color: "bg-yellow-500" },
  ];

  const eventsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(events.length / eventsPerPage);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight" && currentPage < totalPages - 1) {
        setCurrentPage((prevPage) => prevPage + 1);
      } else if (e.key === "ArrowLeft" && currentPage > 0) {
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentPage, totalPages]);

  const startIndex = currentPage * eventsPerPage;
  const currentEvents = events.slice(startIndex, startIndex + eventsPerPage);

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-xl">
        <h2 className="text-5xl font-bold mb-4 font-serif">My Events</h2>
        <p className="mb-6 font-sans text-lg">
          Here's a list of events you've registered for.
        </p>

        {currentEvents.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-300 rounded-2xl p-4 mb-4 font-sans"
          >
            <span className="text-sm font-sans">{event.name}</span>
            <div className="flex items-center">
              <span className="mr-2 text-sm">{event.status}</span>
              <span className={`w-3 h-3 rounded-full ${event.color}`}></span>
            </div>
          </div>
        ))}

        <div className="flex justify-start mt-4 space-x-2">
          {Array(totalPages)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentPage ? "bg-white" : "bg-gray-500"
                }`}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
