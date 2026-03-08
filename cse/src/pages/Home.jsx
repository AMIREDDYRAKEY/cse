import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineCalendar, HiOutlineArrowNarrowRight } from "react-icons/hi";

const Home = () => {
  const resources = [
    {
      title: "Class Notes",
      desc: "Comprehensive lecture notes and study materials curated by our expert faculty.",
      icon: <HiOutlineBookOpen className="text-3xl text-indigo-400" />,
      link: "/notes",
      delay: "0ms"
    },
    {
      title: "Syllabus",
      desc: "Stay aligned with the latest curriculum, course structures, and credit systems.",
      icon: <HiOutlineClipboardList className="text-3xl text-purple-400" />,
      link: "/syllabus",
      delay: "100ms"
    },
    {
      title: "Events",
      desc: "Don't miss out on workshops, seminars, and technical fests happening in the dept.",
      icon: <HiOutlineCalendar className="text-3xl text-teal-400" />,
      link: "/events",
      delay: "200ms"
    },
    {
      title: "Question Papers",
      desc: "Previous years' papers and model questions for mid-exams and semester finals.",
      icon: <HiOutlineClipboardList className="text-3xl text-teal-400" />,
      link: "/question-papers",
      delay: "300ms"
    }
  ];

  return (
    <div className="bg-[#060918] min-h-screen">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-32 relative">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="badge badge-accent mb-4">RESOURCES</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 italic">
            Empowering Your <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to excel in your academics and stay updated with department activities,
            all in one centralized platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 stagger-children">
          {resources.map((item, idx) => (
            <Link
              key={idx}
              to={item.link}
              className="card flex flex-col gap-6 group hover:scale-[1.02] active:scale-[0.98]"
              style={{ animationDelay: item.delay }}
            >
              <div className="w-16 h-16 rounded-2xl bg-slate-800/50 flex items-center justify-center group-hover:bg-indigo-600/20 transition-colors duration-500">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-auto pt-6 flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                Explore Now <HiOutlineArrowNarrowRight className="group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section className="bg-slate-900/30 py-24 border-y border-slate-800/50">
        <div className="max-w-4xl mx-auto px-6 text-center animate-fade-in">
          <h3 className="text-2xl font-bold text-white mb-6">Our Mission</h3>
          <p className="text-slate-400 text-lg leading-relaxed italic">
            "To produce globally competent professionals in Computer Science and Engineering by providing quality
            education through innovative teaching-learning processes and research-oriented environment."
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home