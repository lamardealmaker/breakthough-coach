import React, { memo, useMemo } from "react";
import "../index.css";

const GlowAnimation: React.FC = memo(() => {
  // Generate random properties for each glow particle
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      opacity: Math.random() * 0.5 + 0.3,
      scale: Math.random() * 1 + 0.5,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 8 + 4,
      delay: -Math.random() * 5,
      color: i % 3 === 0 ? "#f59e0b" : i % 3 === 1 ? "#4f46e5" : "#e5e5e5",
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full animate-pulse-slow"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.scale * 70}px`,
            height: `${particle.scale * 70}px`,
            opacity: particle.opacity,
            backgroundColor: particle.color,
            filter: "blur(40px)",
            animation: `pulse-slow ${particle.duration}s infinite ${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
});

export default GlowAnimation; 