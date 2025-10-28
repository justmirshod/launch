"use client";

import { motion } from "framer-motion";

export default function TechDashboard() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Main background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, 0.1) 25%, rgba(59, 130, 246, 0.1) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 76%, transparent 77%, transparent)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Left panel */}
      <motion.div
        className="absolute left-0 top-0 w-64 h-full border-r border-blue-500/20 p-6 space-y-6 overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="space-y-4">
          <div className="text-xs font-mono text-blue-400 tracking-widest">
            TIZIM HOLATI
          </div>
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="flex items-center gap-3"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              <div className="h-1 flex-1 bg-gradient-to-r from-blue-500/50 to-transparent rounded" />
              <span className="text-xs text-blue-300/70">
                {Math.floor(Math.random() * 100)}%
              </span>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-blue-500/10 pt-4">
          <div className="text-xs font-mono text-blue-400 tracking-widest mb-3">
            MODULLAR
          </div>
          {["CORE", "NEURAL", "FLUX", "UTILS", "EXEC"].map((label, i) => (
            <motion.div
              key={label}
              className="flex items-center gap-2 mb-2 text-xs text-blue-300/60"
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <span className="text-blue-500">({i + 1})</span>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Center - Large circular visualization */}
      <motion.div
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <motion.div
          className="w-64 h-64 border-2 border-blue-500/40 rounded-full flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <motion.div
            className="absolute w-48 h-48 border border-blue-400/30 rounded-full"
            animate={{ rotate: -360 }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
          <div className="text-4xl font-bold text-blue-400 font-mono">AI</div>
        </motion.div>

        {/* Orbiting dots */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full"
            animate={{
              x: Math.cos((i * Math.PI) / 2) * 140,
              y: Math.sin((i * Math.PI) / 2) * 140,
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </motion.div>

      {/* Right panel */}
      <motion.div
        className="absolute right-0 top-0 w-72 h-full border-l border-blue-500/20 p-6 space-y-6 overflow-hidden"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="space-y-3">
          <div className="text-xs font-mono text-blue-400 tracking-widest">
            METRIKALAR
          </div>
          {[
            { label: "BANDWIDTH", value: "388 Gb" },
            { label: "LATENCY", value: "53 ms" },
            { label: "THROUGHPUT", value: "1941 Mb" },
          ].map((metric, i) => (
            <motion.div
              key={metric.label}
              className="flex justify-between items-center text-xs"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{
                duration: 2.5,
                delay: i * 0.3,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <span className="text-blue-300/70">{metric.label}</span>
              <span className="text-blue-400 font-mono">{metric.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-blue-500/10 pt-4">
          <div className="text-xs font-mono text-blue-400 tracking-widest mb-3">
            JARAYONLAR
          </div>
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="mb-2 text-xs text-blue-300/60"
              animate={{ opacity: [0.4, 0.8, 0.4] }}
              transition={{
                duration: 3,
                delay: i * 0.4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              <div className="flex justify-between mb-1">
                <span>Process_{i}</span>
                <span>{Math.floor(Math.random() * 100)}%</span>
              </div>
              <div className="h-1 bg-blue-500/20 rounded overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400"
                  animate={{ width: `${Math.floor(Math.random() * 100)}%` }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Bottom info bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 border-t border-blue-500/20 bg-gradient-to-r from-blue-950/50 to-slate-950/50 px-6 py-3 flex justify-between items-center text-xs text-blue-300/60 font-mono"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <span>TIZIM TAYYOR</span>
        <span>v2.4.1</span>
        <span>ISHGA TUSHIRISHNI KUTMOQDA</span>
      </motion.div>
    </div>
  );
}
