import React, { useState } from 'react';
import { transformText } from './services/toneService';
import ToneSlider from './components/ToneSlider';
import ResultCard from './components/ResultCard';
import { ArrowRight, Quote } from 'lucide-react';

// Updated examples mixing boastful, neutral, and humble starter sentences
const EXAMPLES = [
  "I'm literally the smartest person in this room.",
  "I managed to put my socks on correctly today.",
  "I went to the grocery store.",
  "My art collection is worth more than this building.",
  "I think I might be average at best."
];

const App: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [bragLevel, setBragLevel] = useState(0);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Background gradient calculation based on brag level
  const getBackgroundGradient = (level: number) => {
    if (level === 0) return 'from-slate-800 to-gray-900'; // Neutral
    
    // Negative (Humble) - Blues/Teals
    if (level < 0) {
      const intensity = Math.abs(level);
      if (intensity <= 2) return 'from-blue-900 to-slate-900'; 
      return 'from-indigo-900 via-purple-950 to-slate-900';
    }
    
    // Positive (Brag) - Reds/Golds
    const intensity = level;
    if (intensity <= 2) return 'from-orange-900 to-slate-900';
    return 'from-red-900 via-orange-950 to-stone-900';
  };

  const handleTransform = async () => {
    if (!inputText.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult('');
    
    try {
      const transformed = await transformText(inputText, bragLevel);
      setResult(transformed);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.metaKey) {
        handleTransform();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ease-in-out bg-gradient-to-br ${getBackgroundGradient(bragLevel)} text-white font-sans selection:bg-white/20`}>
      <div className="max-w-3xl mx-auto px-4 py-12 md:py-20 flex flex-col gap-12">
        
        {/* Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-white/5 rounded-2xl mb-4 backdrop-blur-sm border border-white/10 shadow-xl">
             <Quote className="w-8 h-8 text-white/80" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white/80 to-white/50 pb-2">
            HumbleBrag
          </h1>
          <p className="text-lg text-white/60 max-w-lg mx-auto leading-relaxed">
            Tune your tone from <span className="text-blue-300 font-medium">pathetic apology</span> to <span className="text-red-400 font-medium">god-like narcissism</span>.
          </p>
        </header>

        {/* Main Controls */}
        <main className="space-y-10">
          
          {/* Input Section */}
          <section className="space-y-4">
            <div className="relative group">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a fact here (e.g., 'I bought a new car')"
                className="w-full h-32 bg-black/20 hover:bg-black/30 focus:bg-black/40 backdrop-blur-md rounded-2xl p-6 text-lg md:text-xl placeholder:text-white/20 border border-white/10 focus:border-white/30 focus:outline-none focus:ring-4 focus:ring-white/5 transition-all resize-none shadow-inner"
              />
              <div className="absolute bottom-4 right-4 text-xs text-white/30 font-medium pointer-events-none">
                CMD + Enter to submit
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap gap-2 justify-center">
              {EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setInputText(ex)}
                  className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-white/60 hover:text-white transition-all border border-transparent hover:border-white/10"
                >
                  {ex}
                </button>
              ))}
            </div>
          </section>

          {/* Slider Section */}
          <section className="bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-sm shadow-2xl">
            <ToneSlider value={bragLevel} onChange={setBragLevel} disabled={isLoading} />
          </section>

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={handleTransform}
              disabled={isLoading || !inputText.trim()}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-200 bg-white font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)]"
            >
              <span>{isLoading ? 'Processing...' : 'Transform Tone'}</span>
              {!isLoading && <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />}
              <div className="absolute inset-0 -z-10 rounded-full blur-lg opacity-40 bg-white group-hover:opacity-60 transition-opacity"></div>
            </button>
          </div>

          {/* Output Section */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-center animate-fade-in">
              {error}
            </div>
          )}
          
          {(result || isLoading) && (
            <section className="animate-slide-up">
              <ResultCard text={result} original={inputText} loading={isLoading} />
            </section>
          )}

        </main>

        <footer className="text-center text-white/20 text-sm pt-12">
          <p>Powered by Gemini 2.5 Flash</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
