import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlineDownload, HiOutlineSearch, HiOutlineFilter, HiX } from "react-icons/hi";

const Questionpaper = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [activeYear, setActiveYear] = useState("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPapers();
  }, []);

  const fetchPapers = async () => {
    try {
      const res = await fetch("https://cse-rockers-server.onrender.com/api/question-papers");
      const data = await res.json();
      setPapers(data);
    } catch (err) {
      console.error("Error fetching papers:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPapers = papers.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.year && String(p.year).toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "All" || p.type === filterType;
    const matchesYear = activeYear === "All" || p.year === activeYear || (p.year && String(p.year).includes(activeYear));
    return matchesSearch && matchesFilter && matchesYear;
  });


  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col xl:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="relative w-full xl:w-96 group">
          <div className="absolute inset-0 bg-indigo-500/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center">
            <HiOutlineSearch className="absolute left-4 text-slate-500 text-xl group-focus-within:text-indigo-400 transition-colors" />
            <input
              type="text"
              placeholder="Search by subject or exam title..."
              className="input-field pl-12 pr-10 py-3 w-full bg-slate-900/40 border-slate-800/50 backdrop-blur-md focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-4 text-slate-500 hover:text-white transition-colors"
              >
                <HiX className="text-lg" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full xl:w-auto">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <HiOutlineFilter className="text-indigo-400 hidden lg:block" />
            <select
              className="input-field py-2.5 bg-[#0c122a] md:bg-slate-900/40 border-slate-800/50 backdrop-blur-md text-sm min-w-[140px] w-full md:w-auto"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Mid-1">Mid-1</option>
              <option value="Mid-2">Mid-2</option>
              <option value="Semester">Prefinals</option>
              <option value="Supply">Supply</option>
            </select>
          </div>

          <div className="flex bg-slate-900/40 p-1 rounded-xl border border-slate-800/50 backdrop-blur-md w-full md:w-auto overflow-x-auto hide-scrollbar">
            {["All", "1st", "2nd", "3rd", "4th"].map((yr) => (
              <button
                key={yr}
                onClick={() => setActiveYear(yr)}
                className={`flex-1 px-4 py-2 flex items-center justify-center rounded-lg text-xs font-bold transition-all whitespace-nowrap ${activeYear === yr
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20"
                  : "text-slate-500 hover:text-slate-300"
                  }`}
              >
                {yr === "All" ? "ALL YR" : `${yr} YR`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
          <p className="text-slate-400 animate-pulse">Scanning Archive...</p>
        </div>
      ) : filteredPapers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-children">
          {filteredPapers.map((paper, index) => (
            <div
              key={paper._id || index}
              className="card group hover:border-indigo-500/30 transition-all duration-500"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                  <HiOutlineDocumentText size={24} />
                </div>
                <div className="flex gap-2">
                  <span className="badge badge-accent text-[10px] uppercase font-bold text-white bg-indigo-500/10 border-indigo-500/20">{paper.year || "N/A"}</span>
                  <span className="badge badge-accent text-[10px] text-purple-400 bg-purple-500/10 border-purple-500/20">{paper.type || "EXAM"}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">{paper.subject}</h2>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2">{paper.title}</p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/50">
                <span className="text-xs text-slate-500 italic">Past Examination Paper</span>
                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-indigo-400 text-sm font-bold group-hover:underline"
                >
                  Download <HiOutlineDownload />
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 px-6 glass rounded-3xl border-dashed border-2 border-slate-800 text-center animate-fade-in w-full">
          <div className="w-16 h-16 rounded-full bg-slate-800/20 flex items-center justify-center mb-6">
            <HiOutlineDocumentText className="text-4xl text-slate-600" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No matches found</h3>
          <p className="text-slate-500 max-w-xs mx-auto leading-relaxed text-center">
            We couldn't find any exams matching your criteria. Try adjusting your search or filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Questionpaper;