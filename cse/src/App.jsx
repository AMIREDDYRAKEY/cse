import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Notes from './components/Notes/Notesdetails'
import Syllabus from './pages/Syllabus'
import Events from './pages/Events'
import Admin from './pages/Admin'
import QuestionPapers from './pages/QuestionPapers'
import Contact from './components/Contact'
import Faculty from './components/Faculty'
import Loader from './components/Loader'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Remove loader after animation completes (2.6s delay + 0.6s fade = 3.2s)
    const timer = setTimeout(() => setLoading(false), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/syllabus" element={<Syllabus />} />
        <Route path="/events" element={<Events />} />
        <Route path="/question-papers" element={<QuestionPapers />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/faculty" element={<Faculty />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App