import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Notes", path: "/notes" },
    { name: "Syllabus", path: "/syllabus" },
    { name: "Papers", path: "/question-papers" },
    { name: "Events", path: "/events" },
    // { name: "Faculty", path: "/faculty" },
    { name: "Contact", path: "/contact" },
    { name: "Admin", path: "/admin" },
  ];


  return (
    <>
      {/* Top Navbar Bar */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-300 px-6 py-4 ${scrolled ? "glass-strong shadow-2xl" : "bg-transparent"
          } md:!absolute`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-indigo-500/20">
              C
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              CSE<span className="gradient-text tracking-normal ml-1">Dept.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                  ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                  : link.name === "Admin"
                    ? "btn-primary !py-2 !px-4 hover:scale-105 active:scale-95 ml-2"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors relative z-[1001]"
          >
            {open ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu - rendered OUTSIDE nav as a portal-like overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[999] md:hidden"
          style={{ top: 0, left: 0, right: 0, bottom: 0, position: "fixed" }}
        >
          {/* Full-screen solid background */}
          <div className="absolute inset-0 bg-[#060918]" />

          {/* Menu content */}
          <div className="relative z-10 flex flex-col h-full pt-[80px] px-6 pb-8 overflow-y-auto">
            <div className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className={`p-4 rounded-xl text-lg font-semibold transition-all duration-300 ${location.pathname === link.path
                    ? "bg-indigo-600/10 text-indigo-400 border border-indigo-600/20"
                    : link.name === "Admin"
                      ? "btn-primary !py-4 text-center mt-2 shadow-xl shadow-indigo-500/20 active:scale-95"
                      : "text-slate-400 bg-slate-800/30 active:bg-slate-800/50"
                    }`}
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  {link.name === "Admin" ? "Admin Portal" : link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
