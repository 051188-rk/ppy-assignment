"use client";
import { useState, useEffect } from 'react';

const CustomButton = ({ 
  children, 
  onClick, 
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const [isRipple, setIsRipple] = useState(false);
  const [coords, setCoords] = useState({ x: -1, y: -1 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRipple(true);
      const timer = setTimeout(() => setIsRipple(false), 300);
      return () => clearTimeout(timer);
    } else setIsRipple(false);
  }, [coords]);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    onClick && onClick(e);
  };

  // Get the secondary color from the navbar
  const secondaryColor = 'rgba(220, 38, 38, 0.6)'; // Red-600 with 60% opacity
  const secondaryColorHover = 'rgba(185, 28, 28, 0.8)'; // Slightly darker on hover

  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={`
        relative overflow-hidden rounded-lg px-6 py-3
        font-medium text-white transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      style={{
        backgroundColor: '#B91C1C', // Red-700 from your secondary navbar
        position: 'relative',
      }}
    >
      {/* Gradient overlay */}
      <span 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.3) 100%
          )`,
          transition: 'opacity 0.2s ease',
        }}
      />
      
      {/* Ripple effect */}
      {isRipple && (
        <span
          className="absolute rounded-full bg-white bg-opacity-30"
          style={{
            left: `${coords.x}px`,
            top: `${coords.y}px`,
            width: '5px',
            height: '5px',
            transform: 'translate(-50%, -50%) scale(1)',
            animation: 'ripple 600ms linear',
          }}
        />
      )}
      
      {/* Button label */}
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
      
      {/* Hover effect */}
      <style jsx global>{`
        @keyframes ripple {
          to {
            transform: translate(-50%, -50%) scale(100);
            opacity: 0;
          }
        }
        
        button:hover .gradient {
          opacity: 0.9;
        }
        
        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </button>
  );
};

export default CustomButton;
