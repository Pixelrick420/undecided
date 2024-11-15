import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import "./Btn.css";

const ViewPage = () => {
  const eventsPerPage = 3;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [hoverIndex, setHoverIndex] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) fetchInitialEvents(user);
    });
    return () => unsubscribe();
  }, []);

  const fetchInitialEvents = async (currentUser) => {
    if (!currentUser) {
      console.error("No user is logged in.");
      setEvents([]);
      setHasMore(false);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const eventsRef = collection(db, "events");

      const q = query(
        eventsRef,
        where("participantEmails", "array-contains", currentUser.email),
        orderBy("name"),
        limit(eventsPerPage)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setEvents([]);
        setHasMore(false);
      } else {
        const fetchedEvents = snapshot.docs.map((doc) => formatEvent(doc));
        setEvents(fetchedEvents);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setHasMore(snapshot.docs.length === eventsPerPage);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreEvents = async () => {
    if (!lastVisible || !hasMore) return;

    try {
      setLoading(true);
      const eventsRef = collection(db, "events");

      const q = query(
        eventsRef,
        where("participants", "array-contains", { email: user.email }),
        orderBy("name"),
        startAfter(lastVisible),
        limit(eventsPerPage)
      );

      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        setHasMore(false);
      } else {
        const fetchedEvents = snapshot.docs.map((doc) => formatEvent(doc));
        setEvents((prevEvents) => [...prevEvents, ...fetchedEvents]);
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      }
    } catch (error) {
      console.error("Error fetching more events:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatEvent = (doc) => {
    const data = doc.data();
    return {
      name: data.name,
      status: data.status || "Going",
      color: getEventColor(data.status || "Going"),
    };
  };

  const getEventColor = (status) => {
    const colors = {
      Going: "bg-green-500",
      Cancelled: "bg-red-500",
      Postponed: "bg-yellow-500",
    };
    return colors[status] || "bg-gray-500";
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex justify-center items-center">
      <div className="w-full max-w-xl">
        <h2 className="text-4xl font-bold mb-4 font-serif">My Events</h2>
        <p className="mb-6 font-sans text-sm italic">
          Here's a list of events you've registered for.
        </p>

        {loading && events.length === 0 ? (
          <div className="text-center text-xl font-sans italic">
            Loading events...
          </div>
        ) : !user ? (
          <div className="text-center text-xl font-sans italic">
            Please log in to view your events.
          </div>
        ) : events.length === 0 ? (
          <div className="text-center text-xl font-sans italic">
            No events found for the user.
          </div>
        ) : (
          <>
            {events.map((event, index) => (
              <div
                key={index}
                className="flex justify-between items-center border border-gray-300 rounded-2xl p-4 mb-4 font-sans">
                <span className="text-sm font-serif">{event.name}</span>
                <div
                  className="flex items-center ml-auto relative"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}>
                  {hoverIndex === index && (
                    <span className="mr-2 text-sm text-center absolute left-0 text-white">
                      {event.status}
                    </span>
                  )}
                  <span
                    className={`btn w-3 h-3 rounded-full ${event.color}`}></span>
                </div>
              </div>
            ))}

            {hasMore && (
              <button
                onClick={fetchMoreEvents}
                className="mt-4 bg-gray-700 text-white px-4 py-2 rounded">
                Load More
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ViewPage;
