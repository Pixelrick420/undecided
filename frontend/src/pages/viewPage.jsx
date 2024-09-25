import React from "react";

const ViewPage = () => {
  const events = [
    { name: "Event Name.", status: "Going", color: "bg-green-500" },
    { name: "Event Name.", status: "Cancelled", color: "bg-red-500" },
    { name: "Event Name.", status: "Postponed", color: "bg-yellow-500" },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-xl">
        <h2 className="text-3xl font-bold mb-4 font-serif">My Events</h2>
        <p className="mb-6 font-sans text-lg">
          Here's a list of events you've registered for.
        </p>

        {events.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-300 rounded-2xl p-4 mb-4 font-sans">
            <span className="text-sm font-sans">{event.name}</span>
            <div className="flex items-center">
              <span className="mr-2 text-sm">{event.status}</span>
              <span className={`w-3 h-3 rounded-full ${event.color}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPage;
