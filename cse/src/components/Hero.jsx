import { useNavigate } from "react-router-dom";
import img from "../assets/Aits Logo.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-grid">
      {/* Decorative Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600/20 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10 text-center md:text-left">

        {/* Content Side */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6 md:gap-8 animate-fade-in-up">
          <div className="badge badge-accent w-fit stagger-children">
            <span>✨ Innovation in Tech</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-[1.1] text-white">
            Future of <br className="hidden md:block" />
            <span className="gradient-text whitespace-nowrap">Computing</span> Starts Here
          </h1>

          <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-lg">
            Join the elite circle of innovators at the CSE Department. We empower students with high-end tech,
            research opportunities, and a community of visionaries.
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 md:mt-4">
            <button
              onClick={() => navigate("/notes")}
              className="btn-primary shadow-indigo-500/25 px-8"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/syllabus")}
              className="btn-ghost backdrop-blur-sm px-8"
            >
              View Curriculum
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-8 mt-6 md:mt-8 pt-8 border-t border-slate-800/50 w-full md:w-fit">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xl md:text-2xl font-bold text-white">500+</p>
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-1">Students</p>
            </div>
            <div className="flex flex-col items-center md:items-start border-x border-slate-800 px-4 md:px-0 md:border-x-0">
              <p className="text-xl md:text-2xl font-bold text-white">50+</p>
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-1">Research</p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xl md:text-2xl font-bold text-white">100%</p>
              <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest mt-1">Placement</p>
            </div>
          </div>
        </div>

        {/* Visual Side */}
        <div className="w-full md:w-1/2 flex justify-center relative animate-fade-in">
          <div className="relative animate-float">
            {/* Main Image Frame */}
            <div className="relative z-10 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass p-3 border-slate-700/50 rotate-3 group hover:rotate-0 transition-transform duration-500">
              <img
                src={img}
                alt="CSE Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>

            {/* Background elements for depth */}
            <div className="absolute -top-6 -right-6 w-32 h-32 glass border-slate-700/30 rounded-2xl -z-10 rotate-12 transition-all duration-700 group-hover:rotate-45"></div>
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-2xl -z-20 rounded-full"></div>

            {/* Floating Tech Badges */}
            <div className="absolute -right-4 md:-right-12 top-1/4 glass border-slate-700/50 p-2 md:p-3 rounded-2xl shadow-xl animate-float delay-75">
              <span className="text-xl md:text-2xl">💻</span>
            </div>
            <div className="absolute -left-4 md:-left-12 bottom-1/4 glass border-slate-700/50 p-2 md:p-3 rounded-2xl shadow-xl animate-float delay-150">
              <span className="text-xl md:text-2xl">🚀</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

