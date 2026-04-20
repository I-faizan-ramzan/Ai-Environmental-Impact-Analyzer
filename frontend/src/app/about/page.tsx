'use client';

import { motion } from 'framer-motion';
import { Target, Server, Leaf, Database, Cpu, Layout, Code2 } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    { name: "Iqra Nazim", role: "Project Lead Frontend Developer", email: "", avatar: "IN" },
    { name: "Ezzah Khan", role: "Backend Developer", email: "", avatar: "EK" },
    { name: "Amina Hassan", role: "Frontend , Designs and Documentation", email: "", avatar: "AH" }
  ];

  const technologies = [
    { name: "Next.js", icon: <Layout className="w-5 h-5 text-blue-400" />, desc: "Frontend Framework" },
    { name: "Node.js & Express", icon: <Server className="w-5 h-5 text-green-400" />, desc: "Backend API Engine" },
    { name: "MongoDB", icon: <Database className="w-5 h-5 text-emerald-500" />, desc: "Scalable Data Storage" },
    { name: "Google Gemini", icon: <Cpu className="w-5 h-5 text-purple-400" />, desc: "Generative AI Analysis" },
  ];

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 max-w-5xl mx-auto">
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-400/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-green-400/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-400 mb-6">
          <Leaf className="w-4 h-4" />
          <span className="text-sm font-medium">Our Mission</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Empowering <span className="text-gradient">Sustainable</span> Choices
        </h1>
        <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          The AI Environmental Impact Analyzer is a sophisticated platform designed to bring transparency and scientific accuracy back to lifestyle choices. By leveraging advanced AI models to calculate footprints and logging them for personalized tracking, we help you make informed, eco-friendly decisions.
        </p>
      </motion.div>

      {/* Tech Stack Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-20"
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2 border-b border-white/10 pb-4">
          <Server className="w-6 h-6 text-green-400" />
          Powered by Modern Tech
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
          {technologies.map((tech, idx) => (
            <div key={idx} className="glass-card p-6 flex flex-col items-center text-center group">
              <div className="p-4 bg-white/5 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                {tech.icon}
              </div>
              <h3 className="font-semibold text-gray-200">{tech.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{tech.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* How it Works / Core Values */}
       <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-20 glass-card p-8 md:p-12 border-l-4 border-l-green-400"
      >
        <h2 className="text-2xl font-bold mb-6">How AI Drives Sustainability</h2>
        <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed space-y-4">
          <p>
            Traditional environmental assessments are often manual, slow, and prone to human error. By utilizing <strong className="text-gray-200">Google Gemini Pro</strong>, we can process complex lifestyle data in milliseconds to provide accurate, data-backed environmental scores.
          </p>
          <p>
            Every calculation is securely tracked in our platform, allowing users to visualize their long-term progress, earn Eco-Points for positive behavior, and benchmark their impact against a global community committed to change.
          </p>
        </div>
      </motion.div>

      {/* Team / Contact */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col gap-8 items-center justify-center max-w-3xl mx-auto"
      >
        <div className="w-full  glass-card p-8 md:p-12 border-l-4 border-l-green-400">
          <h2 className="text-2xl font-bold mb-8 flex items-center justify-center gap-2 border-b border-white/10 pb-4">
            <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Project Team
          </h2>
          <div className="space-y-4 ">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 transition-all duration-300 hover:scale-105 hover:bg-white/[0.05] hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)]">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gradient-to-tr from-green-400 to-cyan-400 flex items-center justify-center text-black font-bold text-xl shrink-0 border-2 border-white/10 relative transition-transform duration-300 group-hover:scale-110 group-hover:border-cyan-400/50">
                  {member.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-200">{member.name}</h4>
                  <p className="text-sm text-gray-500">
                    {member.role}{member.email ? ` • ${member.email}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* GitHub Section Temporarily Hidden 
        <div className="w-full md:w-1/2 glass-card p-8 text-center flex flex-col items-center justify-center min-h-[200px]">
          <Github className="w-12 h-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">Open Source</h3>
          <p className="text-gray-400 text-sm mb-6">
            Licensed under GNU General Public License v3.0. Contributions are welcome!
          </p>
          <Link href="https://github.com/Kaeytee/Ai-Environmental-Impact-Analyzer" target="_blank" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition-colors border border-white/5">
            View on GitHub
          </Link>
        </div>
        */}
      </motion.div>
    </div>
  );
}
