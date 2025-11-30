import React from 'react';
import { LEVEL_DESCRIPTIONS } from '../types';

interface ToneSliderProps {
  value: number;
  onChange: (val: number) => void;
  disabled?: boolean;
}

const ToneSlider: React.FC<ToneSliderProps> = ({ value, onChange, disabled }) => {
  const currentInfo = LEVEL_DESCRIPTIONS[value];

  return (
    <div className="w-full flex flex-col items-center space-y-6">
      <div className="flex justify-between w-full text-[10px] md:text-xs font-extrabold tracking-widest uppercase px-1">
        <span className="text-blue-400 drop-shadow-md">Ultimate Humble</span>
        <span className="text-white/20 font-medium">Neutral</span>
        <span className="text-red-400 drop-shadow-md">Ultimate Brag</span>
      </div>
      
      <div className="relative w-full group py-2">
        {/* Meter Background Gradient */}
        <div className="absolute top-1/2 left-0 w-full h-3 -mt-1.5 rounded-full opacity-40 bg-gradient-to-r from-blue-600 via-gray-500 to-red-600 blur-sm transition-opacity group-hover:opacity-60"></div>
        <div className="absolute top-1/2 left-0 w-full h-1.5 -mt-0.5 rounded-full bg-gradient-to-r from-blue-500 via-gray-400 to-red-500"></div>

        <input
          type="range"
          min="-4"
          max="4"
          step="1"
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`relative w-full h-2 bg-transparent appearance-none cursor-pointer focus:outline-none z-10 ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
          style={{
            // Dynamic thumb color used by index.html styling
            color: value > 0 ? '#f87171' : value < 0 ? '#60a5fa' : '#d1d5db' 
          }}
        />
        
        {/* Meter Ticks */}
        <div className="absolute top-1/2 left-0 w-full flex justify-between px-[10px] pointer-events-none -translate-y-1/2 h-full items-center">
          {[...Array(9)].map((_, i) => (
             <div 
                key={i} 
                className={`rounded-full transition-all duration-300 ${
                  i === 4 
                    ? 'w-1 h-3 bg-white shadow-[0_0_10px_white]' 
                    : 'w-0.5 h-1.5 bg-white/40'
                }`}
             ></div>
          ))}
        </div>
      </div>

      <div className="text-center transition-all duration-300 transform min-h-[110px] flex flex-col items-center justify-center">
        <div className="text-6xl mb-3 animate-bounce-short drop-shadow-2xl filter hover:brightness-110 transition-transform hover:scale-110 cursor-help">
          {currentInfo.emoji}
        </div>
        <div className={`text-2xl font-black tracking-wide ${currentInfo.color} drop-shadow-md uppercase`}>
          {currentInfo.label}
        </div>
        <div className="text-white/30 text-xs font-mono mt-2 tracking-widest border border-white/10 px-2 py-0.5 rounded-md bg-black/20">
           LEVEL {value > 0 ? `+${value}` : value}
        </div>
      </div>
    </div>
  );
};

export default ToneSlider;