import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlineDownload, HiOutlineSearch, HiOutlineFilter } from "react-icons/hi";

const Questionpaper = () => {
  const [papers, setPapers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");
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
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/40 p-4 rounded-2xl border border-white/5 backdrop-blur-md">
        <div className="relative w-full md:w-96">
          <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by subject or exam title..."
            className="input-field pl-12 py-3 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <HiOutlineFilter className="text-indigo-400" />
          <select
            className="input-field py-3 bg-[#0c122a] min-w-[140px]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Mid-1">Mid-1</option>
            <option value="Mid-2">Mid-2</option>
            <option value="Semester">Semester</option>
            <option value="Supply">Supply</option>
          </select>
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
        <div className="text-center py-20 bg-slate-900/20 rounded-3xl border border-dashed border-white/5">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
            <HiOutlineSearch size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-400">No papers found</h3>
          <p className="text-slate-600 text-sm mt-2">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Questionpaper;