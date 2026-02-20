'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Recycle, Droplets, Wind } from 'lucide-react';

export function Recommendations() {
  const suggestions = [
    {
      title: "Recycled Packaging",
      desc: "Switch to 100% post-consumer recycled materials to save up to 40% emissions.",
      icon: <Recycle className="w-5 h-5" />,
      color: "text-green-400",
      bg: "bg-green-400/10"
    },
    {
      title: "Local Sourcing",
      desc: "Reduce transportation carbon footprint by sourcing materials within 500 miles.",
      icon: <Wind className="w-5 h-5" />,
      color: "text-blue-400",
      bg: "bg-blue-400/10"
    },
    {
      title: "Water Conservation",
      desc: "Implement closed-loop water systems in manufacturing.",
      icon: <Droplets className="w-5 h-5" />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10"
    }
  ];

  return (
    <div className="mt-8 w-full max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
        Eco-Friendly Alternatives
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + idx * 0.1 }}
            className="glass-card p-5 group cursor-pointer"
          >
            <div className={`p-3 rounded-lg w-fit mb-4 ${item.bg} ${item.color}`}>
              {item.icon}
            </div>
            <h4 className="font-semibold text-lg mb-2 text-gray-200">{item.title}</h4>
            <p className="text-sm text-gray-400 mb-4">{item.desc}</p>
            
            <div className="flex items-center gap-1 text-sm font-medium text-white/50 group-hover:text-white transition-colors">
              Explore Change <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
