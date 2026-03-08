import React from 'react'
import Navbar from './Navbar'

const Faculty = () => {
  const staff = [
    { name: "Dr. Robert Wilson", role: "Head of Department", specialization: "Artificial Intelligence", imgPath: "https://i.pravatar.cc/150?u=robert" },
    { name: "Prof. Sarah Chen", role: "Senior Professor", specialization: "Data Science", imgPath: "https://i.pravatar.cc/150?u=sarah" },
    { name: "Dr. James Bond", role: "Assistant Professor", specialization: "Cyber Security", imgPath: "https://i.pravatar.cc/150?u=james" },
    { name: "Dr. Emily Blunt", role: "Associate Professor", specialization: "Cloud Computing", imgPath: "https://i.pravatar.cc/150?u=emily" }
  ];

  return (
    <div className="bg-[#060918] min-h-screen text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="badge badge-accent mb-4 uppercase tracking-widest">OUR EXPERTS</span>
          <h1 className="text-4xl md:text-5xl font-black italic">Distinguished <span className="gradient-text">Faculty</span></h1>
          <p className="section-subtitle">
            Guided by industry leaders and academic pioneers committed to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
          {staff.map((member, idx) => (
            <div key={idx} className="card group hover:scale-[1.05] transition-transform duration-500">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-indigo-600/20 blur-2xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={member.imgPath}
                  alt={member.name}
                  className="w-32 h-32 rounded-3xl mx-auto object-cover border-2 border-slate-800 group-hover:border-indigo-500/50 transition-colors"
                />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors">{member.name}</h3>
                <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-4">{member.role}</p>
                <div className="pt-4 border-t border-slate-800/50">
                  <p className="text-slate-500 text-xs italic">Expertise in {member.specialization}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Faculty
