import React from "react";

const ViewPage = () => {
  const events = [
    { name: "Event Name.", status: "Going", color: "bg-green-500" },
    { name: "Event Name.", status: "Cancelled", color: "bg-red-500" },
    { name: "Event Name.", status: "Postponed", color: "bg-yellow-500" },
  ];

  return (
    <div className="mt-10 min-h-screen w-full bg-black text-white flex flex-col items-center">
      <div className="w-full px-6">
        <h2 className="text-2xl font-bold mb-4">My Events</h2>
        <p className="mb-6">Here's a list of events you've registered for.</p>

        {events.map((event, index) => (
          <div
            key={index}
            className="flex justify-between items-center border border-gray-400 rounded-2xl p-8 mt-4 mb-4 w-full"
          >
            <span className="text-lg">{event.name}</span>
            <div className="flex items-center">
              <span className="mr-2">{event.status}</span>
              <span className={`w-3 h-3 rounded-full ${event.color}`}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewPage;
