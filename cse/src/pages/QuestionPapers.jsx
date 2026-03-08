import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import QuestionpaperComponent from '../components/Questionpaper';
import { HiOutlineAcademicCap } from "react-icons/hi";

const QuestionPapers = () => {
    return (
        <div className="bg-[#060918] min-h-screen text-white relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 blur-[120px] rounded-full -z-10 translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full -z-10 -translate-x-1/2 translate-y-1/2"></div>

            <Navbar />

            <main className="max-w-7xl mx-auto px-6 pt-40 pb-32">
                <header className="mb-16 stagger-children">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20">
                            <HiOutlineAcademicCap size={24} />
                        </div>
                        <span className="badge badge-accent uppercase tracking-widest font-bold">Past Examinations</span>
                    </div>

                    <h1 className="text-5xl md:text-6xl font-black italic mb-6">
                        Question <span className="gradient-text">Archive</span>
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                        Access a comprehensive collection of previous years' question papers, mid-exams, and
                        semester finals to boost your preparation.
                    </p>
                </header>

                <QuestionpaperComponent />
            </main>
            <Footer />
        </div>
    );
};

export default QuestionPapers;
