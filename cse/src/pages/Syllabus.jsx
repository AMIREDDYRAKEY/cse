import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { HiOutlineDocumentText } from "react-icons/hi";

const Syllabus = () => {
  const [syllabus, setSyllabus] = useState([]);
  const [activeSyllabus, setActiveSyllabus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/syllabus")
      .then((res) => res.json())
      .then((data) => {
        setSyllabus(data);
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
          <span className="badge badge-accent mb-4 uppercase tracking-widest">CURRICULUM</span>
          <h1 className="text-4xl md:text-5xl font-black italic">Academic <span className="gradient-end">Syllabus</span></h1>
          <p className="section-subtitle">
            Stay updated with the latest course structures, elective choices, and credit systems.
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 max-w-4xl mx-auto">
            {[1, 2, 3].map(i => <div key={i} className="h-40 skeleton"></div>)}
          </div>
        ) : syllabus.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl max-w-4xl mx-auto border-dashed border-2 border-slate-800">
            <p className="text-slate-500">No syllabus information found at this time.</p>
          </div>
        ) : (
          <div className="grid gap-8 max-w-5xl mx-auto stagger-children">
            {syllabus.map((item) => {
              const id = item._id || item.id;
              return (
                <div key={id} className="card group flex flex-col md:flex-row gap-8 border-indigo-500/10">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                        <HiOutlineDocumentText size={20} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{item.course}</h2>
                        <span className="text-sm text-slate-500 uppercase tracking-widest font-bold">{item.semester} Semester</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                      {item.subjects.map((sub, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/50 hover:border-indigo-500/30 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                          <span className="text-slate-300 text-sm font-medium">{sub}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="md:w-48 flex flex-col justify-center items-center gap-4 bg-slate-800/20 rounded-2xl p-6 border border-slate-700/30">
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-widest text-center">Resources</span>
                    <button
                      onClick={() => item.url ? window.open(item.url, '_blank') : alert("No PDF available for this curriculum.")}
                      className="btn-primary w-full text-xs !py-3"
                    >
                      Download PDF
                    </button>
                    <button
                      onClick={() => setActiveSyllabus(item)}
                      className="btn-ghost w-full text-xs !py-3"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );})}
          </div>
        )}
        {/* Syllabus Details Modal */}
        {activeSyllabus && (
          <div className="modal-overlay" onClick={() => setActiveSyllabus(null)}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
              <div className="mb-6">
                <span className="badge badge-accent mb-4">CURRICULUM OVERVIEW</span>
                <h2 className="text-3xl font-black text-white">{activeSyllabus.course}</h2>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">{activeSyllabus.semester} Semester</p>
              </div>

              <div className="space-y-3 mb-8">
                <p className="text-sm text-slate-500 font-bold">CORE SUBJECTS</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeSyllabus.subjects.map((sub, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-300 text-sm">
                      {sub}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <button className="btn-ghost flex-1" onClick={() => setActiveSyllabus(null)}>Close</button>
                <button
                  className="btn-primary flex-1"
                  onClick={() => activeSyllabus.url ? window.open(activeSyllabus.url, '_blank') : alert("No PDF available.")}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Syllabus;

