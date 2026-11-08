import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, BarChart2, Star, Play, ArrowRight, CheckCircle2 } from 'lucide-react';

interface BusinessOSSectionProps {
  onDiscoverMore: () => void;
  onWatchVideo: () => void;
}

export const BusinessOSSection: React.FC<BusinessOSSectionProps> = ({
  onDiscoverMore,
  onWatchVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white via-[#F7F8FF]/80 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid matching reference image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Visual Architecture Preview Window with Play Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 relative group"
          >
            <div className="relative h-64 sm:h-72 w-full rounded-[32px] overflow-hidden border border-[#E9EAF2] shadow-xl shadow-[#633BFF]/10">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                alt="Modern Autonomous Enterprise Headquarters"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#15172B]/60 via-transparent to-transparent" />
              
              {/* Glowing Purple Play Button in center matching reference image */}
              <button
                onClick={onWatchVideo}
                aria-label="Play video preview"
                className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white flex items-center justify-center shadow-2xl shadow-[#633BFF]/50 hover:scale-110 active:scale-95 transition-transform duration-200"
              >
                <Play className="w-6 h-6 fill-current ml-1" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/80">
                  BusinessPilot OS in Action
                </span>
                <p className="text-sm font-bold truncate">24/7 Autonomous Operations Overview</p>
              </div>
            </div>
          </motion.div>

          {/* Center Column: Editorial Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 flex flex-col items-start space-y-4"
          >
            <div className="flex items-center space-x-1.5 text-[#633BFF] text-xs font-bold tracking-wider uppercase">
              <span>◆ THE BUSINESS OS</span>
            </div>
            
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#15172B] tracking-tight leading-tight">
              Automate. Grow. Scale.
            </h3>

            <p className="text-sm sm:text-base text-[#687089] leading-relaxed">
              Powerful tools, intelligent automation and real-time insights — all in one place.
            </p>

            <button
              onClick={onDiscoverMore}
              className="mt-2 inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#633BFF] to-[#4285FF] text-white font-semibold text-xs shadow-md shadow-[#633BFF]/25 hover:shadow-lg hover:shadow-[#633BFF]/35 hover:-translate-y-0.5 transition-all"
            >
              <span>Discover More</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>

          {/* Right Column: 3 Metric Counters Card matching reference image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-[28px] border border-[#E9EAF2] p-6 shadow-xl shadow-[#633BFF]/5 grid grid-cols-3 gap-3 divide-x divide-[#E9EAF2]/80">
              
              {/* Metric 1: 10K+ Businesses Trust Us */}
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#633BFF]/10 to-[#4285FF]/10 text-[#633BFF] flex items-center justify-center mb-2">
                  <Rocket className="w-5 h-5" />
                </div>
                <span className="text-lg sm:text-xl font-extrabold text-[#15172B]">10K+</span>
                <span className="text-[10px] sm:text-[11px] text-[#687089] mt-0.5 leading-tight">
                  Businesses Trust Us
                </span>
              </div>

              {/* Metric 2: 300% Average Growth */}
              <div className="flex flex-col items-center text-center pl-3 pr-1">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4285FF]/10 to-[#62D9ED]/10 text-[#4285FF] flex items-center justify-center mb-2">
                  <BarChart2 className="w-5 h-5" />
                </div>
                <span className="text-lg sm:text-xl font-extrabold text-[#15172B]">300%</span>
                <span className="text-[10px] sm:text-[11px] text-[#687089] mt-0.5 leading-tight">
                  Average Growth
                </span>
              </div>

              {/* Metric 3: 4.9/5 Customer Rating */}
              <div className="flex flex-col items-center text-center pl-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-2">
                  <Star className="w-5 h-5 fill-current" />
                </div>
                <span className="text-lg sm:text-xl font-extrabold text-[#15172B]">4.9/5</span>
                <span className="text-[10px] sm:text-[11px] text-[#687089] mt-0.5 leading-tight">
                  Customer Rating
                </span>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

