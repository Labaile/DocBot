"use client";

export function Scanline() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen w-screen z-[100]">
      <div className="w-full h-[3px] bg-electric-emerald/20 blur-md shadow-[0_0_15px_rgba(16,185,129,0.4)] animate-scan" />
      <style jsx global>{`
        @keyframes scan {
          0% { transform: translateY(-10vh); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

export function AmbientGlow() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-electric-emerald/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-electric-emerald/5 blur-[120px] rounded-full" />
    </div>
  );
}
