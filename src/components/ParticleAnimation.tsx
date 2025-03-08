import React, { memo, useMemo } from "react";
import "./ParticleAnimation.css";

const ParticleAnimation: React.FC = memo(() => {
  // Generate random properties for each particle
  const particles = useMemo(() => {
    return Array.from({ length: 150 }, (_, i) => ({
      id: i,
      opacity: Math.random() * 0.5 + 0.1,
      scale: Math.random() * 0.6 + 0.2,
      x: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: -Math.random() * 15,
    }));
  }, []);

  return (
    <div className="particle-container">
      {particles.map((particle) => (
        <div key={particle.id} className="particle" />
      ))}
    </div>
  );
});

export default ParticleAnimation; 