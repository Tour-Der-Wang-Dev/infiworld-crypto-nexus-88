
import { useEffect, useRef } from 'react';

const StarsBackground = () => {
  const starsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!starsRef.current) return;
    
    const starsContainer = starsRef.current;
    const starCount = 100;
    
    // Clear any existing stars
    starsContainer.innerHTML = '';
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      
      // Random positions
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      
      // Random size
      const size = Math.random() * 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random animation duration
      const duration = 2 + Math.random() * 8;
      star.style.setProperty('--duration', `${duration}s`);
      
      // Random animation delay
      star.style.animationDelay = `${Math.random() * 10}s`;
      
      starsContainer.appendChild(star);
    }
  }, []);
  
  return <div ref={starsRef} className="stars"></div>;
};

export default StarsBackground;
