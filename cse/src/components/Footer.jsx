import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="py-8 border-t border-slate-800/50 bg-[#060918]">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-600/20">C</div>
                    <span className="text-lg font-bold text-white tracking-tight">CSE Dept.</span>
                </div>

                <p className="text-slate-500 text-sm text-center">
                    © {new Date().getFullYear()} CSE Department. All rights reserved.
                </p>

                <div className="flex gap-4">
                    <a href="#" className="text-slate-400 hover:text-white transition-colors p-2"><FaTwitter size={18} /></a>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors p-2"><FaLinkedin size={18} /></a>
                    <a href="#" className="text-slate-400 hover:text-white transition-colors p-2"><FaGithub size={18} /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
