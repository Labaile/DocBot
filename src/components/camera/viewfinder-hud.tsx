import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

interface ViewfinderHUDProps {
  status?: "searching" | "locked" | "capturing" | "processing";
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}

export function ViewfinderHUD({ status = "searching", videoRef }: ViewfinderHUDProps) {
  const isLocked = status === "locked" || status === "processing";
  const isProcessing = status === "processing";
  const accentColor = isLocked ? "border-electric-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border-white/40 shadow-none";
  const textColor = isLocked ? "text-electric-emerald" : "text-white/40";

  return (
    <div className={`relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black backdrop-blur-xl transition-all duration-500 ${geistMono.className}`}>
      {/* Live Video Feed */}
      {videoRef && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ${isProcessing ? "opacity-30 blur-sm scale-105" : "opacity-60 blur-0 scale-100"}`}
        />
      )}

      {/* Internal HUD Scanline (Specific to Viewfinder Area) */}
      {isProcessing && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="w-full h-1 bg-electric-emerald/40 blur-sm shadow-[0_0_20px_rgba(16,185,129,0.6)] animate-v-scan" />
        </div>
      )}

      {/* Corner Markers */}
      <div className={`absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 transition-colors duration-500 z-20 ${accentColor}`} />
      <div className={`absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 transition-colors duration-500 z-20 ${accentColor}`} />
      <div className={`absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 transition-colors duration-500 z-20 ${accentColor}`} />
      <div className={`absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 transition-colors duration-500 z-20 ${accentColor}`} />

      {/* Privacy Lock Badge */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5 backdrop-blur-md z-20">
        <div className="w-1.5 h-1.5 rounded-full bg-electric-emerald shadow-[0_0_5px_#10B981]" />
        <span className="text-[8px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">Privacy Lock: Zero-Retention Active</span>
      </div>

      {/* Crosshair */}
      <div className={`absolute top-1/2 left-1/2 h-4 w-px -translate-y-1/2 transition-colors duration-500 z-20 ${isLocked ? "bg-electric-emerald/60" : "bg-white/20"}`} />
      <div className={`absolute top-1/2 left-1/2 w-4 h-px -translate-x-1/2 transition-colors duration-500 z-20 ${isLocked ? "bg-electric-emerald/60" : "bg-white/20"}`} />

      {/* Metadata Labels */}
      <div className="absolute top-12 left-12 flex flex-col gap-1 z-20">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">ISO: AUTO</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">F: 1.8</span>
      </div>

      <div className="absolute top-12 right-12 flex flex-col items-end gap-1 z-20">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isProcessing ? 'bg-orange-400 animate-ping' : isLocked ? 'bg-electric-emerald' : 'bg-white/20 animate-pulse'}`} />
          <span className={`text-[10px] uppercase tracking-[0.2em] transition-colors ${isProcessing ? 'text-orange-400' : textColor}`}>
            {isProcessing ? "ANALYZING_DOC" : isLocked ? "DOC_LOCKED" : "READY_SCAN"}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">RES: 4K_RAW</span>
      </div>

      {/* Scanning HUD Footer */}
      <div className="absolute bottom-12 left-0 right-0 px-12 text-center z-20">
        <div className={`h-px w-full transition-colors duration-500 ${isProcessing ? "bg-orange-400/30" : isLocked ? "bg-electric-emerald/30" : "bg-white/10"} mb-4`} />
        <p className={`text-[10px] uppercase tracking-[0.3em] leading-relaxed transition-colors ${isProcessing ? 'text-orange-400' : 'text-white/40'}`}>
          {isProcessing ? "Extracting intelligence..." : isLocked ? "Stable - Capture Enabled" : "Align document within frame"}
        </p>
      </div>

      {/* Simulated Camera Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-30" />

      <style jsx>{`
        @keyframes v-scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(75vh); opacity: 0; }
        }
        .animate-v-scan {
          animation: v-scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
