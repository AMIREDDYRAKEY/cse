import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Notes from './components/Notes/Notesdetails'
import Syllabus from './pages/Syllabus'
import Events from './pages/Events'
import Admin from './pages/Admin'
import QuestionPapers from './pages/QuestionPapers'
import Contact from './components/Contact'
import Faculty from './components/Faculty'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
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