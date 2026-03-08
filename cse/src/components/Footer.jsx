import React from 'react'
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="py-16 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">C</div>
                    <span className="text-lg font-bold text-white tracking-tight">CSE Dept.</span>
                </div>

                <p className="text-slate-500 text-sm text-center max-w-md">
                    © 2024 Computer Science & Engineering Department. Built with ❤️ for students.
                </p>

                <div className="flex gap-6">
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><FaTwitter /></a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><FaLinkedin /></a>
                    <a href="#" className="text-slate-500 hover:text-white transition-colors"><FaGithub /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
