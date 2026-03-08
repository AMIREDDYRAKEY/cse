import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { HiOutlineDownload, HiOutlineEye, HiOutlineSearch, HiOutlineBookOpen, HiX } from "react-icons/hi";

const Notesdetails = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://cse-rockers-server.onrender.com/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setNotes(data);
        setFilteredNotes(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const val = e.target.value.toLowerCase();
    setSearch(val);
    setFilteredNotes(
      notes.filter(n =>
        n.title.toLowerCase().includes(val) ||
        n.subject.toLowerCase().includes(val)
      )
    );
  };

  return (
    <div className="bg-[#060918] min-h-screen text-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 animate-fade-in">
          <div>
            <span className="badge badge-accent mb-4 uppercase tracking-widest">Digital Library</span>
            <h1 className="text-4xl md:text-5xl font-black italic ">Study <span className="">Notes</span></h1>
            <p className="text-slate-400 mt-2">Access high-quality lecture materials and resources.</p>
          </div>

          <div className="relative w-full md:w-96 group">
            <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center">
              <HiOutlineSearch className="absolute left-4 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search subjects, topics..."
                className="input-field pl-12 pr-10 w-full bg-slate-900/40 border-slate-800/50 backdrop-blur-md focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                value={search}
                onChange={handleSearch}
              />
              {search && (
                <button
                  onClick={() => { setSearch(""); setFilteredNotes(notes); }}
                  className="absolute right-4 text-slate-500 hover:text-white transition-colors"
                >
                  <HiX className="text-lg" />
                </button>
              )}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 skeleton"></div>)}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 glass rounded-3xl border-dashed border-2 border-slate-800">
            <HiOutlineBookOpen className="text-6xl text-slate-700 mb-4" />
            <p className="text-xl text-slate-500 font-medium">No notes found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
            {filteredNotes.map((note) => {
              const id = note._id || note.id;
              return (
                <div
                  key={id}
                  className="card group cursor-pointer border-indigo-500/5"
                  onClick={() => setActiveNote(note)}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                      <HiOutlineBookOpen size={24} />
                    </div>
                    <span className="badge badge-accent text-[10px]">{note.unit ? `UNIT ${note.unit}` : "GENERAL"}</span>
                  </div>

                  <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{note.subject}</h2>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-2">{note.title}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                    <span className="text-xs text-slate-500 italic">By {note.uploadedBy || "Faculty"}</span>
                    <button className="flex items-center gap-2 text-indigo-400 text-sm font-bold group-hover:underline">
                      View <HiOutlineEye />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Note Details Modal */}
        {activeNote && (
          <div className="modal-overlay" onClick={() => setActiveNote(null)}>
            <div className="modal-content relative" onClick={e => e.stopPropagation()}>
              <div className="mb-8">
                <span className="badge badge-accent mb-4">NOTE DETAILS</span>
                <h2 className="text-3xl font-black text-white">
                  {activeNote.subject}
                </h2>
                <p className="text-slate-400 font-medium mt-1">{activeNote.title}</p>
              </div>

              <div className="space-y-4 mb-10 bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Unit Number</span>
                  <span className="text-white font-semibold">{activeNote.unit || "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Contributor</span>
                  <span className="text-white font-semibold">{activeNote.uploadedBy || "Faculty"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Upload Date</span>
                  <span className="text-white font-semibold">{new Date(activeNote.date).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  className="flex-1 btn-ghost"
                  onClick={() => setActiveNote(null)}
                >
                  Close
                </button>
                <button
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                  onClick={() => {
                    if (activeNote.url) window.open(activeNote.url, "_blank");
                    else alert("No download link available for this note.");
                  }}
                >
                  Download <HiOutlineDownload />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notesdetails;

