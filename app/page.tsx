"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import LaunchButton from "@/components/launch-button";
import TechDashboard from "@/components/tech-dashboard";

export default function Home() {
  const [isActivated, setIsActivated] = useState(false);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-background"
    >
      {!isActivated && <TechDashboard />}

      {/* Background with subtle grid effect */}
      <div className="absolute inset-0 bg-background">
        {/* Grid pattern with gradient */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent 0px, rgba(30, 64, 175, 0.02) 1px, transparent 2px, transparent 42px), repeating-linear-gradient(90deg, transparent 0px, rgba(30, 64, 175, 0.02) 1px, transparent 2px, transparent 42px)",
            backgroundSize: "44px 44px",
            backgroundPosition: "0 0",
          }}
        />

        {/* Enhanced radial glow effect centered on the button */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, rgba(30, 64, 175, 0.4) 0%, rgba(30, 64, 175, 0.2) 25%, rgba(37, 99, 235, 0.1) 40%, rgba(29, 78, 216, 0.05) 55%, transparent 75%)`,
          }}
        />

        {/* Additional overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, rgba(30, 64, 175, 0.03) 1px, transparent 1px, transparent 44px), repeating-linear-gradient(90deg, transparent, rgba(30, 64, 175, 0.03) 1px, transparent 1px, transparent 44px)`,
            opacity: 0.6,
            filter: "blur(0.5px)",
          }}
        />
      </div>

      {/* Main content - splits on activation */}
      {!isActivated && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative z-10 flex flex-col items-center justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.2,
                type: "spring",
                stiffness: 100,
              }}
              className="text-center"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 mb-4"
                animate={{
                  backgroundPosition: ["0%", "100%", "0%"],
                  textShadow: [
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                    "0 0 40px rgba(59, 130, 246, 0.6)",
                    "0 0 20px rgba(59, 130, 246, 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Lokomotivlardan intellektual foydalanish tizimi
              </motion.h1>
              <motion.p
                className="text-lg text-gray-400 font-light tracking-widest"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Bosib ushlab turing
              </motion.p>
            </motion.div>

            {/* Launch button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                type: "spring",
                stiffness: 100,
              }}
            >
              <LaunchButton
                onActivate={() => setIsActivated(true)}
                pageProgress={progress}
              />
            </motion.div>
          </div>
        </motion.div>
      )}

      {!isActivated && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(to top, 
              rgba(59, 130, 246, 0.3) 0%,
              rgba(37, 99, 235, 0.2) 15%,
              rgba(29, 78, 216, 0.1) 30%,
              transparent 50%)`,
            clipPath: `polygon(0 ${100 - progress}%, 100 ${
              100 - progress
            }%, 100 100%, 0 100%)`,
          }}
          animate={{
            opacity: progress > 0 ? 1 : 0,
          }}
        />
      )}

      {!isActivated && progress > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.2)" />
            </linearGradient>
          </defs>
          <motion.path
            d={`M 0,${800 - progress * 8} Q 300,${
              800 - progress * 8 - 30 * Math.sin(progress / 10)
            } 600,${800 - progress * 8} T 1200,${
              800 - progress * 8
            } L 1200,800 L 0,800 Z`}
            fill="url(#waveGradient)"
            animate={{
              d: `M 0,${800 - progress * 8} Q 300,${
                800 - progress * 8 - 40 * Math.sin(progress / 10)
              } 600,${800 - progress * 8} T 1200,${
                800 - progress * 8
              } L 1200,800 L 0,800 Z`,
            }}
            transition={{ duration: 0.1 }}
          />
        </svg>
      )}

      {isActivated && (
        <motion.div
          className="absolute inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </div>
  );
}
