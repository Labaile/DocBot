import { Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-deep-slate text-white font-sans selection:bg-electric-emerald/30">
      <main className="relative flex flex-col items-center gap-8 p-8 md:p-24 overflow-hidden">
        {/* Aesthetic emerald glow */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-electric-emerald/10 blur-[120px] rounded-full" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-electric-emerald/5 blur-[120px] rounded-full" />

        <div className="relative flex flex-col items-center gap-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-electric-emerald/10 border border-electric-emerald/20 text-electric-emerald shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <Zap size={32} />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            DocBot
          </h1>
          
          <p className="max-w-[420px] text-lg text-white/60 leading-relaxed uppercase tracking-widest text-sm font-medium">
            Intelligence in Every Frame
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="h-12 px-8 rounded-full bg-electric-emerald text-deep-slate font-bold hover:bg-electric-emerald/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-electric-emerald/20">
            Get Started
          </button>
          <button className="h-12 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm">
            Architecture
          </button>
        </div>

        <div className="mt-16 flex items-center gap-2 text-xs font-mono text-white/30 uppercase tracking-[0.2em]">
          <span className="w-2 h-2 rounded-full bg-electric-emerald animate-pulse" />
          System Active: v0.1.0-Emerald
        </div>
      </main>
    </div>
  );
}
