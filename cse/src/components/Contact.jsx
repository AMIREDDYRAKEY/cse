import React, { useState } from 'react'
import Navbar from './Navbar'
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading('Sending your message...');

    try {
      const response = await fetch('https://cse-rockers-server.onrender.com/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      toast.success("Message sent! We'll get back to you soon.", { id: toastId });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(err.message || "Failed to send message", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#060918] min-h-screen text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="badge badge-accent mb-4">GET IN TOUCH</span>
          <h1 className="text-4xl md:text-5xl font-black italic">Contact <span className="gradient-text">Us</span></h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Info Side */}
          <div className="space-y-8 animate-fade-in">
            <div className="card glass border-indigo-500/10 p-8 rounded-3xl">
              <h3 className="text-2xl font-bold mb-6">Department Info</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-400">
                    <HiOutlineLocationMarker size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Address</p>
                    <p className="text-sm text-slate-400"> @Cse AITS KADAPA, C.K.Dinne, India.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-400">
                    <HiOutlinePhone size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Phone</p>
                    <p className="text-sm text-slate-400">+91 040 1234 5678</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-teal-600/10 flex items-center justify-center text-teal-400">
                    <HiOutlineMail size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Email</p>
                    <p className="text-sm text-slate-400">info.cse@aits.edu.in</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="card glass border-indigo-500/10 p-8 rounded-3xl animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1 mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="How can we help you?"
                  className="input-field w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 outline-none transition-all min-h-[150px]"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`btn-primary w-full py-4 rounded-xl font-bold transition-all ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-95'}`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Contact
