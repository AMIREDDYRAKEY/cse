import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { HiOutlineCalendar, HiOutlineLocationMarker, HiOutlineClock } from "react-icons/hi";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://cse-rockers-server.onrender.com/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#060918] min-h-screen text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col items-center mb-16 text-center animate-fade-in">
          <span className="badge badge-accent mb-4 uppercase tracking-widest">HAPPENING NOW</span>
          <h1 className="text-4xl md:text-5xl font-black italic">Upcoming <span className="gradient-text">Events</span></h1>
          <p className="section-subtitle">
            Join our workshops, hackathons, and seminars to stay ahead in the tech world.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-8 max-w-4xl mx-auto">
            {[1, 2].map(i => <div key={i} className="h-48 skeleton"></div>)}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl max-w-4xl mx-auto border-dashed border-2 border-slate-800">
            <p className="text-slate-500">No upcoming events scheduled right now. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 max-w-4xl mx-auto stagger-children">
            {events.map((event) => {
              const date = new Date(event.date);
              return (
                <div key={event._id} className="card group flex flex-col md:flex-row gap-8 border-indigo-500/10">
                  {/* Date Badge */}
                  <div className="md:w-32 flex flex-col items-center justify-center bg-indigo-600/10 rounded-2xl p-4 border border-indigo-500/20 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                    <span className="text-sm font-bold uppercase tracking-tighter opacity-70">
                      {date.toLocaleString('default', { month: 'short' })}
                    </span>
                    <span className="text-4xl font-black">
                      {date.getDate()}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap gap-4 mb-3">
                      <span className="badge badge-accent bg-indigo-500/10 text-[10px] flex items-center gap-1">
                        <HiOutlineClock /> 10:00 AM
                      </span>
                      <span className="badge badge-accent bg-purple-500/10 text-purple-400 border-purple-500/20 text-[10px] flex items-center gap-1">
                        <HiOutlineLocationMarker /> {event.location}
                      </span>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                      {event.name}
                    </h2>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {event.description}
                    </p>

                    <button className="mt-6 text-sm font-bold text-indigo-400 hover:underline flex items-center gap-2">
                      Register Now →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Events;

