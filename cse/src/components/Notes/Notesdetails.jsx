import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResources } from "../../store/slices/resourceSlice";
import Navbar from "../Navbar";
import { HiOutlineDownload, HiOutlineEye, HiOutlineSearch, HiOutlineBookOpen, HiX } from "react-icons/hi";

const Notesdetails = () => {
  const dispatch = useDispatch();
  const { notes, loading: reduxLoading } = useSelector((state) => state.resources);

  const [filteredNotes, setFilteredNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeYear, setActiveYear] = useState("All");
  const [activeSemester, setActiveSemester] = useState("All");

  useEffect(() => {
    // Always fetch latest data in the background
    dispatch(fetchResources('notes'));
  }, [dispatch]);

  useEffect(() => {
    // Show cached data immediately if available, or stop loading when fetch completes
    if (notes.length > 0 || !reduxLoading) {
      setLoading(false);
    }
  }, [notes.length, reduxLoading]);

  useEffect(() => {
    applyFilters(search, activeYear, activeSemester);
  }, [search, activeYear, activeSemester, notes]);

  const applyFilters = (searchTerm, yearTerm, semesterTerm) => {
    const sTerm = searchTerm.toLowerCase();
    setFilteredNotes(
      notes.filter(n => {
        const matchesSearch = n.title.toLowerCase().includes(sTerm) ||
          n.subject.toLowerCase().includes(sTerm);
        const matchesYear = yearTerm === "All" || n.year === yearTerm;
        const matchesSemester = semesterTerm === "All" || n.semester === semesterTerm;
        return matchesSearch && matchesYear && matchesSemester;
      })
    );
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
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

          <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80 group">
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
                    onClick={() => setSearch("")}
                    className="absolute right-4 text-slate-500 hover:text-white transition-colors"
                  >
                    <HiX className="text-lg" />
                  </button>
                )}
              </div>
            </div>

            <div className="flex bg-slate-900/40 p-1 rounded-xl border border-slate-800/50 backdrop-blur-md w-full md:w-auto overflow-x-auto hide-scrollbar">
              {["All", "1st", "2nd", "3rd", "4th"].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setActiveYear(yr)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeYear === yr
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  {yr === "All" ? "ALL YRS" : `${yr} YR`}
                </button>
              ))}
            </div>

            <div className="flex bg-slate-900/40 p-1 rounded-xl border border-slate-800/50 backdrop-blur-md w-full md:w-auto overflow-x-auto hide-scrollbar">
              {["All", "1st", "2nd"].map((sem) => (
                <button
                  key={sem}
                  onClick={() => setActiveSemester(sem)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeSemester === sem
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                    : "text-slate-500 hover:text-slate-300"
                    }`}
                >
                  {sem === "All" ? "ALL SEMS" : `${sem} SEM`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-48 skeleton"></div>)}
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 glass rounded-3xl border-dashed border-2 border-slate-800 text-center animate-fade-in w-full">
            <div className="w-16 h-16 rounded-full bg-slate-800/20 flex items-center justify-center mb-6">
              <HiOutlineBookOpen className="text-4xl text-slate-600" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
            <p className="text-slate-500 max-w-xs mx-auto leading-relaxed text-center">
              We couldn't find any notes matching "<strong>{search}</strong>". Try different keywords or check other years.
            </p>
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
                    <div className="flex gap-2 flex-wrap">
                      <span className="badge badge-accent text-[10px] uppercase font-bold">
                        {note.year || "Gen"} YR {note.semester ? `| ${note.semester} SEM` : ""}
                      </span>
                      <span className="badge badge-accent text-[10px] uppercase font-bold">{note.unit ? `UNIT ${note.unit}` : "GENERAL"}</span>
                    </div>
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
                  <span className="text-slate-500">Academic Year</span>
                  <span className="text-white font-semibold">{activeNote.year ? `${activeNote.year} Year` : "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Semester</span>
                  <span className="text-white font-semibold">{activeNote.semester ? `${activeNote.semester} Semester` : "N/A"}</span>
                </div>
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

