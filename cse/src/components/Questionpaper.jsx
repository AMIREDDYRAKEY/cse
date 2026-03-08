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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper, index) => (
            <div
              key={paper._id || index}
              className="card group hover:border-indigo-500/30 transition-all duration-500 flex flex-col justify-between"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                  <HiOutlineDocumentText size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight group-hover:text-indigo-400 transition-colors">{paper.title}</h3>
                  <p className="text-slate-500 text-sm mt-1">{paper.subject}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Session</span>
                  <span className="text-sm text-slate-300 font-medium">{paper.year} • {paper.type}</span>
                </div>

                <a
                  href={paper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-indigo-600/10 text-indigo-400 hover:bg-indigo-600 hover:text-white transition-all duration-300 active:scale-95 shadow-lg shadow-indigo-600/0 hover:shadow-indigo-600/20"
                >
                  <HiOutlineDownload size={20} />
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