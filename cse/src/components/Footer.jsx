import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="py-12 border-t border-slate-800/50 bg-[#060918]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 py-4">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-indigo-600/20">C</div>
                            <span className="text-xl font-bold text-white tracking-tight">CSE Dept.</span>
                        </div>
                        <p className="text-slate-500 text-sm text-center md:text-left max-w-xs leading-relaxed">
                            Empowering students through innovation, research, and technical excellence.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex gap-5">
                            <a href="#" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 border border-white/5"><FaTwitter size={18} /></a>
                            <a href="#" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 border border-white/5"><FaLinkedin size={18} /></a>
                            <a href="#" className="p-3 rounded-full bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-300 border border-white/5"><FaGithub size={18} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Computer Science & Engineering Department. Built with ❤️ for students.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Privacy</a>
                        <a href="#" className="text-slate-500 hover:text-indigo-400 transition-colors">Terms</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
