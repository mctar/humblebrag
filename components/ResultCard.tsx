import React, { useState } from 'react';
import { Copy, Check, Sparkles, ArrowDown } from 'lucide-react';

interface ResultCardProps {
  text: string;
  original: string;
  loading: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ text, original, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="w-full p-8 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 animate-pulse flex flex-col items-center justify-center h-40">
        <Sparkles className="w-8 h-8 text-white/50 animate-spin-slow mb-3" />
        <span className="text-white/60 font-medium">Transmuting ego...</span>
      </div>
    );
  }

  if (!text) {
    return null;
  }

  return (
    <div className="w-full rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-white/5 relative group">
      
      {/* Header / Actions */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white/60 hover:text-white text-xs font-medium transition-colors backdrop-blur-sm border border-white/5"
        >
          {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      
      <div className="p-6 md:p-8 flex flex-col">
        
        {/* Original Input */}
        {original && (
          <div className="mb-2">
             <p className="text-sm md:text-base text-white/40 font-serif italic">
               "{original}"
             </p>
          </div>
        )}

        {/* Transformed Output (Immediately Below) */}
        <div>
          <ArrowDown className="text-blue-300 w-4 h-4 mb-2 opacity-50" />
          <p className="text-2xl md:text-4xl font-serif text-white leading-tight drop-shadow-lg">
            {text}
          </p>
        </div>

      </div>
      
      {/* Subtle bottom label */}
      <div className="px-6 py-2 bg-black/10 text-right">
        <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Generated Transformation</span>
      </div>
    </div>
  );
};

export default ResultCard;
