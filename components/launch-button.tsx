"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface LaunchButtonProps {
  onActivate: () => void;
  pageProgress?: number;
}

export default function LaunchButton({
  onActivate,
  pageProgress = 0,
}: LaunchButtonProps) {
  const [isHolding, setIsHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const isHoldingRef = useRef(false);

  const HOLD_DURATION = 3000;

  const handleMouseDown = () => {
    if (isHoldingRef.current) return;
    setIsHolding(true);
    isHoldingRef.current = true;
    startTimeRef.current = Date.now();
    setProgress(0);

    const animate = () => {
      if (!startTimeRef.current) return;

      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);

      setProgress(newProgress);

      if (
        (newProgress > 48 && newProgress < 52) ||
        (newProgress > 78 && newProgress < 82)
      ) {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 100);
      }

      if (newProgress >= 100) {
        setIsHolding(false);
        isHoldingRef.current = false;
        onActivate();
        return;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  const handleMouseUp = () => {
    setIsHolding(false);
    isHoldingRef.current = false;
    setProgress(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  const handleTouchStart = handleMouseDown;
  const handleTouchEnd = handleMouseUp;

  useEffect(() => {
    // Keyboard event handlers
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        if (!isHoldingRef.current) {
          setIsHolding(true);
          isHoldingRef.current = true;
          startTimeRef.current = Date.now();
          setProgress(0);

          const animate = () => {
            if (!startTimeRef.current) return;

            const elapsed = Date.now() - startTimeRef.current;
            const newProgress = Math.min((elapsed / HOLD_DURATION) * 100, 100);

            setProgress(newProgress);

            if (
              (newProgress > 48 && newProgress < 52) ||
              (newProgress > 78 && newProgress < 82)
            ) {
              setGlitch(true);
              setTimeout(() => setGlitch(false), 100);
            }

            if (newProgress >= 100) {
              setIsHolding(false);
              isHoldingRef.current = false;
              onActivate();
              return;
            }

            animationFrameRef.current = requestAnimationFrame(animate);
          };

          animationFrameRef.current = requestAnimationFrame(animate);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsHolding(false);
        isHoldingRef.current = false;
        setProgress(0);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particles = [...Array(8)].map((_, i) => ({
    id: i,
    delay: i * 0.1,
    angle: (i * Math.PI * 2) / 8,
  }));

  return (
    <motion.div
      className="relative"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={`glow-${layer}`}
          className="absolute inset-0 rounded-full"
          style={{
            width: 600 + layer * 80,
            height: 600 + layer * 80,
            background:
              layer === 0
                ? "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)"
                : layer === 1
                ? "radial-gradient(circle, rgba(37, 99, 235, 0.2) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
          }}
          animate={{
            scale: isHolding ? [1, 1.4 + layer * 0.2, 1.3 + layer * 0.15] : 1,
            opacity: isHolding
              ? [0.8 - layer * 0.2, 0.3 - layer * 0.1, 0.5 - layer * 0.15]
              : 0.2 - layer * 0.1,
          }}
          transition={{
            duration: 0.6 + layer * 0.2,
            repeat: isHolding ? Number.POSITIVE_INFINITY : 0,
            delay: layer * 0.1,
          }}
        />
      ))}

      {/* Main button */}
      <button
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`relative w-96 h-96 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/10 border-2 border-blue-500/50 flex items-center justify-center cursor-pointer overflow-hidden group transition-all duration-300 hover:border-blue-400 hover:from-blue-500/30 ${
          glitch ? "animate-pulse" : ""
        }`}
        style={{
          boxShadow: isHolding
            ? `0 0 ${40 + progress / 2}px rgba(59, 130, 246, ${
                0.8 + progress / 500
              }), 
               inset 0 0 30px rgba(59, 130, 246, 0.2), 
               0 0 ${20 + progress / 3}px rgba(37, 99, 235, ${progress / 300}),
               0 0 ${15 + progress / 4}px rgba(59, 130, 246, ${progress / 400})`
            : "0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.1)",
          transform: glitch
            ? `translate(${Math.random() * 4 - 2}px, ${
                Math.random() * 4 - 2
              }px)`
            : "translate(0, 0)",
        }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `linear-gradient(to top, 
              rgba(59, 130, 246, 0.9) 0%, 
              rgba(37, 99, 235, 0.7) ${progress * 0.5}%,
              rgba(29, 78, 216, 0.5) ${progress}%,
              transparent ${progress}%)`,
            opacity: progress > 0 ? 1 : 0,
          }}
          animate={{
            filter: isHolding ? "blur(0px)" : "blur(2px)",
          }}
        />

        {isHolding && (
          <>
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute w-1.5 h-1.5 bg-blue-400 rounded-full"
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{
                  x: Math.cos(particle.angle) * (120 + progress / 1.5),
                  y: Math.sin(particle.angle) * (120 + progress / 1.5),
                  opacity: 0,
                  scale: [1, 1.5, 0.5],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle.delay,
                }}
              />
            ))}

            {particles.map((particle) => (
              <motion.div
                key={`blue-${particle.id}`}
                className="absolute w-1 h-1 bg-blue-300 rounded-full"
                initial={{ x: 0, y: 0, opacity: 0.6, scale: 0.8 }}
                animate={{
                  x:
                    Math.cos(particle.angle + Math.PI / 4) *
                    (90 + progress / 2),
                  y:
                    Math.sin(particle.angle + Math.PI / 4) *
                    (90 + progress / 2),
                  opacity: 0,
                  scale: [0.8, 1.2, 0.3],
                }}
                transition={{
                  duration: 1,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: particle.delay + 0.15,
                }}
              />
            ))}
          </>
        )}

        {/* Inner content */}
        <div className="relative z-10 flex flex-col items-center justify-center gap-2">
          <motion.div
            animate={{
              scale: isHolding ? [1, 1.3, 1.1] : 1,
              rotate: isHolding ? 360 : 0,
              filter: glitch
                ? ["blur(0px)", "blur(3px)", "blur(0px)"]
                : "blur(0px)",
            }}
            transition={{
              duration: isHolding ? 1 : 0.2,
              repeat: isHolding ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            <svg
              className="w-24 h-24 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </motion.div>

          <motion.p
            className="text-xl font-semibold text-blue-300 text-center tracking-wider"
            animate={{
              opacity: isHolding ? [1, 0.6, 0.8] : 1,
              scale: isHolding ? [1, 1.15, 1] : 1,
              textShadow: isHolding
                ? [
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.8)",
                    "0 0 10px rgba(59, 130, 246, 0.5)",
                  ]
                : "0 0 0px rgba(59, 130, 246, 0)",
            }}
            transition={{
              duration: 0.4,
              repeat: isHolding ? Number.POSITIVE_INFINITY : 0,
            }}
          >
            {isHolding ? `${Math.round(progress)}%` : "ISHGA TUSHIRISH"}
          </motion.p>
        </div>

        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          animate={{
            boxShadow: isHolding
              ? `0 0 ${20 + progress / 5}px rgba(59, 130, 246, ${
                  0.5 + progress / 200
                }), 
                 inset 0 0 ${20 + progress / 5}px rgba(59, 130, 246, ${
                  0.2 + progress / 500
                }), 
                 0 0 ${10 + progress / 10}px rgba(37, 99, 235, ${
                  progress / 200
                }),
                 0 0 ${5 + progress / 20}px rgba(59, 130, 246, ${
                  progress / 300
                })`
              : "0 0 0px rgba(59, 130, 246, 0)",
          }}
        />
      </button>

      {isHolding && (
        <motion.p
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-blue-400 text-sm font-mono tracking-widest"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: [0.5, 1, 0.5], y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
        >
          ISHGA TUSHIRILMOQDA...
        </motion.p>
      )}
    </motion.div>
  );
}
