import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  HiOutlineLockClosed, HiOutlineLogout, HiOutlinePlus,
  HiOutlineTrash, HiOutlineDocumentText, HiOutlineCalendar,
  HiOutlineBookOpen, HiOutlineCollection, HiOutlineCloudUpload
} from "react-icons/hi";
import toast from 'react-hot-toast';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("notes");

  // Data states
  const [notes, setNotes] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [events, setEvents] = useState([]);
  const [questionPapers, setQuestionPapers] = useState([]);

  // Form states
  const [noteForm, setNoteForm] = useState({ title: "", subject: "", unit: "", uploadedBy: "", url: "" });
  const [noteFile, setNoteFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [syllabusForm, setSyllabusForm] = useState({ course: "", semester: "", subjects: "", url: "" });
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [eventForm, setEventForm] = useState({ name: "", date: "", location: "", description: "" });
  const [qpForm, setQpForm] = useState({ title: "", subject: "", year: "", type: "Semester", url: "" });
  const [qpFile, setQpFile] = useState(null);

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const [resNotes, resSyllabus, resEvents, resQP] = await Promise.all([
        fetch("https://cse-rockers-server.onrender.com/api/notes"),
        fetch("https://cse-rockers-server.onrender.com/api/syllabus"),
        fetch("https://cse-rockers-server.onrender.com/api/events"),
        fetch("https://cse-rockers-server.onrender.com/api/question-papers")
      ]);
      setNotes(await resNotes.json());
      setSyllabus(await resSyllabus.json());
      setEvents(await resEvents.json());
      setQuestionPapers(await resQP.json());
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const toastId = toast.loading('Authenticating...');
    try {
      const res = await fetch("https://cse-rockers-server.onrender.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem("adminToken", data.token);
        toast.success('Successfully logged in!', { id: toastId });
      } else {
        toast.error(data.error || "Access Denied", { id: toastId });
      }
    } catch (err) {
      toast.error("Server connection failed", { id: toastId });
    }
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("adminToken");
    toast.success('Logged out successfully');
  };

  const apiAction = async (path, method, body = null, successMsg = "Action completed") => {
    try {
      const res = await fetch(`https://cse-rockers-server.onrender.com/api/${path}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : null,
      });
      if (res.ok) {
        fetchData();
        toast.success(successMsg);
        return true;
      }
      toast.error("Action failed");
      return false;
    } catch (err) {
      console.error(err);
      toast.error("Request failed");
      return false;
    }
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let finalUrl = noteForm.url;

    try {
      if (noteFile) {
        const formData = new FormData();
        formData.append("pdf", noteFile);

        const uploadRes = await fetch("https://cse-rockers-server.onrender.com/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalUrl = `https://cse-rockers-server.onrender.com${uploadData.url}`;
        } else {
          throw new Error("File upload failed");
        }
      }

      const success = await apiAction("notes", "POST", { ...noteForm, url: finalUrl });
      if (success) {
        setNoteForm({ title: "", subject: "", unit: "", uploadedBy: "", url: "" });
        setNoteFile(null);
        // Reset file input manually
        const fileInput = document.getElementById("pdf-upload");
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSyllabusSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let finalUrl = syllabusForm.url;

    try {
      if (syllabusFile) {
        const formData = new FormData();
        formData.append("pdf", syllabusFile);

        const uploadRes = await fetch("https://cse-rockers-server.onrender.com/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalUrl = `https://cse-rockers-server.onrender.com${uploadData.url}`;
        } else {
          throw new Error("File upload failed");
        }
      }

      const success = await apiAction("syllabus", "POST", {
        ...syllabusForm,
        subjects: syllabusForm.subjects.split(",").map(s => s.trim()),
        url: finalUrl
      });

      if (success) {
        setSyllabusForm({ course: "", semester: "", subjects: "", url: "" });
        setSyllabusFile(null);
        // Reset file input manually
        const fileInput = document.getElementById("syllabus-pdf-upload");
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleQpSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let finalUrl = qpForm.url;

    try {
      if (qpFile) {
        const formData = new FormData();
        formData.append("pdf", qpFile);

        const uploadRes = await fetch("https://cse-rockers-server.onrender.com/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        if (uploadRes.ok) {
          const uploadData = await uploadRes.json();
          finalUrl = `https://cse-rockers-server.onrender.com${uploadData.url}`;
        } else {
          throw new Error("File upload failed");
        }
      }

      const success = await apiAction("question-papers", "POST", { ...qpForm, url: finalUrl });
      if (success) {
        setQpForm({ title: "", subject: "", year: "", type: "Semester", url: "" });
        setQpFile(null);
        const fileInput = document.getElementById("qp-pdf-upload");
        if (fileInput) fileInput.value = "";
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-[#060918] min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full -z-10"></div>
        <Navbar />

        <div className="card glass-strong max-w-md w-full p-10 stagger-children border-indigo-500/20">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 mb-6">
              <HiOutlineLockClosed size={32} />
            </div>
            <h1 className="text-3xl font-black text-white italic">Admin <span className="gradient-text">Portal</span></h1>
            <p className="text-slate-500 text-sm mt-2">Enter your credentials to manage the library.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Security Token</label>
              <input
                type="password"
                placeholder="••••••••"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="btn-primary w-full py-4 mt-4 shadow-indigo-500/20">
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  const SidebarItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`sidebar-link w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${activeTab === id
        ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 shadow-lg"
        : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
        }`}
    >
      <Icon size={20} />
      <span className="font-semibold">{label}</span>
    </button>
  );

  return (
    <div className="bg-[#060918] min-h-screen text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="lg:w-72 flex flex-col gap-6 md:gap-8 animate-fade-in order-2 lg:order-1">
          <div className="hidden lg:block">
            <h1 className="text-3xl font-black italic mb-2">Dashboard</h1>
            <p className="text-slate-500 text-sm">Control center for CSE Dept.</p>
          </div>

          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            <SidebarItem id="notes" label="Notes" icon={HiOutlineBookOpen} />
            <SidebarItem id="syllabus" label="Curriculum" icon={HiOutlineDocumentText} />
            <SidebarItem id="questionPapers" label="Question Papers" icon={HiOutlineCollection} />
            <SidebarItem id="events" label="Events" icon={HiOutlineCalendar} />
          </nav>

          <div className="mt-4 lg:mt-auto pt-6 lg:pt-8 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center lg:justify-start gap-3 px-6 py-4 rounded-2xl text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all duration-300 border border-red-500/10 hover:border-red-500/30 shadow-lg shadow-red-500/5 active:scale-95"
            >
              <HiOutlineLogout size={22} />
              <span className="font-bold tracking-wide uppercase text-xs sm:text-sm">Sign Out Account</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 animate-fade-in-up">
          {activeTab === "notes" && (
            <div className="space-y-8">
              <div className="card glass flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <HiOutlinePlus className="text-indigo-400" /> Add New Resource
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleNoteSubmit}>
                  <input placeholder="Document Title" className="input-field" value={noteForm.title} onChange={e => setNoteForm({ ...noteForm, title: e.target.value })} required />
                  <input placeholder="Subject (e.g. OS, DBMS)" className="input-field" value={noteForm.subject} onChange={e => setNoteForm({ ...noteForm, subject: e.target.value })} required />
                  <input placeholder="Unit Number" className="input-field" value={noteForm.unit} onChange={e => setNoteForm({ ...noteForm, unit: e.target.value })} />
                  <input placeholder="Contributor Name" className="input-field" value={noteForm.uploadedBy} onChange={e => setNoteForm({ ...noteForm, uploadedBy: e.target.value })} />

                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Upload PDF Resource</label>
                    <div className="relative group/file">
                      <input
                        id="pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={e => setNoteFile(e.target.files[0])}
                      />
                      <div className="input-field flex items-center gap-3 bg-slate-900/50 group-hover/file:border-indigo-500/50 transition-colors">
                        <HiOutlineCloudUpload className="text-indigo-400" size={20} />
                        <span className="text-slate-400 truncate">
                          {noteFile ? noteFile.name : "Select PDF file..."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={isUploading}
                      className={`btn-primary w-full flex items-center justify-center gap-2 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {isUploading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Uploading...
                        </>
                      ) : (
                        "Publish Resource"
                      )}
                    </button>
                  </div>
                </form>
              </div>

              <div className="grid gap-4">
                <h3 className="text-slate-500 font-bold uppercase tracking-widest text-xs px-2">Recently Published</h3>
                {notes.map(n => {
                  const id = n._id || n.id;
                  return (
                    <div key={id} className="card p-4 flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <HiOutlineCollection />
                        </div>
                        <div>
                          <p className="font-bold text-white">{n.title}</p>
                          <p className="text-xs text-slate-500">{n.subject} • Unit {n.unit || "All"}</p>
                        </div>
                      </div>
                      <button onClick={() => apiAction(`notes/${id}`, "DELETE")} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "syllabus" && (
            <div className="space-y-8">
              <div className="card glass flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <HiOutlinePlus className="text-indigo-400" /> Update Curriculum
                </h2>
                <form className="space-y-4" onSubmit={handleSyllabusSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Course (e.g. B.Tech CSE)" className="input-field" value={syllabusForm.course} onChange={e => setSyllabusForm({ ...syllabusForm, course: e.target.value })} required />
                    <input placeholder="Semester (e.g. III, IV)" className="input-field" value={syllabusForm.semester} onChange={e => setSyllabusForm({ ...syllabusForm, semester: e.target.value })} required />
                  </div>
                  <textarea placeholder="Subjects (comma separated items)" className="input-field min-h-[100px]" value={syllabusForm.subjects} onChange={e => setSyllabusForm({ ...syllabusForm, subjects: e.target.value })} required />

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Upload Syllabus PDF</label>
                    <div className="relative group/file">
                      <input
                        id="syllabus-pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={e => setSyllabusFile(e.target.files[0])}
                      />
                      <div className="input-field flex items-center gap-3 bg-slate-900/50 group-hover/file:border-indigo-500/50 transition-colors">
                        <HiOutlineCloudUpload className="text-indigo-400" size={20} />
                        <span className="text-slate-400 truncate">
                          {syllabusFile ? syllabusFile.name : "Select Syllabus file..."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      "Update Syllabus"
                    )}
                  </button>
                </form>
              </div>

              <div className="grid gap-4">
                {syllabus.map(s => {
                  const id = s._id || s.id;
                  return (
                    <div key={id} className="card p-4 flex items-center justify-between border-slate-800">
                      <div>
                        <p className="font-bold text-white">{s.course}</p>
                        <p className="text-xs text-slate-500">{s.semester} Semester • {s.subjects.length} Subjects</p>
                      </div>
                      <button onClick={() => apiAction(`syllabus/${id}`, "DELETE")} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "questionPapers" && (
            <div className="space-y-8">
              <div className="card glass flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <HiOutlinePlus className="text-indigo-400" /> Upload Question Paper
                </h2>
                <form className="space-y-4" onSubmit={handleQpSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input placeholder="Exam Title (e.g. DBMS Mid-1)" className="input-field" value={qpForm.title} onChange={e => setQpForm({ ...qpForm, title: e.target.value })} required />
                    <input placeholder="Subject" className="input-field" value={qpForm.subject} onChange={e => setQpForm({ ...qpForm, subject: e.target.value })} required />
                    <input placeholder="Year (e.g. 2023-24)" className="input-field" value={qpForm.year} onChange={e => setQpForm({ ...qpForm, year: e.target.value })} required />
                    <select className="input-field bg-[#0c122a]" value={qpForm.type} onChange={e => setQpForm({ ...qpForm, type: e.target.value })}>
                      <option value="Mid-1">Mid-1</option>
                      <option value="Mid-2">Mid-2</option>
                      <option value="Semester">Semester</option>
                      <option value="Supply">Supply</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Select PDF Paper</label>
                    <div className="relative group/file">
                      <input
                        id="qp-pdf-upload"
                        type="file"
                        accept=".pdf"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={e => setQpFile(e.target.files[0])}
                      />
                      <div className="input-field flex items-center gap-3 bg-slate-900/50 group-hover/file:border-indigo-500/50 transition-colors">
                        <HiOutlineCloudUpload className="text-indigo-400" size={20} />
                        <span className="text-slate-400 truncate">
                          {qpFile ? qpFile.name : "Select Paper file..."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${isUploading ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {isUploading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Uploading...
                      </>
                    ) : (
                      "Publish Question Paper"
                    )}
                  </button>
                </form>
              </div>

              <div className="grid gap-4">
                {questionPapers.map(qp => {
                  const id = qp._id || qp.id;
                  return (
                    <div key={id} className="card p-4 flex items-center justify-between border-slate-800 group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                          <HiOutlineDocumentText />
                        </div>
                        <div>
                          <p className="font-bold text-white">{qp.title}</p>
                          <p className="text-xs text-slate-500">{qp.subject} • {qp.year} • {qp.type}</p>
                        </div>
                      </div>
                      <button onClick={() => apiAction(`question-papers/${id}`, "DELETE")} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === "events" && (
            <div className="space-y-8">
              <div className="card glass flex flex-col gap-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <HiOutlinePlus className="text-indigo-400" /> Schedule Event
                </h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => {
                  e.preventDefault();
                  apiAction("events", "POST", eventForm);
                  setEventForm({ name: "", date: "", location: "", description: "" });
                }}>
                  <input placeholder="Event Name" className="input-field" value={eventForm.name} onChange={e => setEventForm({ ...eventForm, name: e.target.value })} required />
                  <input type="date" className="input-field" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} required />
                  <input placeholder="Location" className="input-field" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} />
                  <textarea placeholder="Event Description" className="input-field md:col-span-2 min-h-[80px]" value={eventForm.description} onChange={e => setEventForm({ ...eventForm, description: e.target.value })} />
                  <button className="btn-primary md:col-span-2 italic">Launch Event</button>
                </form>
              </div>

              <div className="grid gap-4">
                {events.map(e => {
                  const id = e._id || e.id;
                  return (
                    <div key={id} className="card p-4 flex items-center justify-between border-slate-800">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 font-bold">
                          <span className="text-[10px] uppercase">{new Date(e.date).toLocaleString('default', { month: 'short' })}</span>
                          <span className="text-lg leading-none">{new Date(e.date).getDate()}</span>
                        </div>
                        <div>
                          <p className="font-bold text-white">{e.name}</p>
                          <p className="text-xs text-slate-500">{e.location}</p>
                        </div>
                      </div>
                      <button onClick={() => apiAction(`events/${id}`, "DELETE")} className="p-2 text-slate-600 hover:text-red-500 transition-colors">
                        <HiOutlineTrash size={20} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;

