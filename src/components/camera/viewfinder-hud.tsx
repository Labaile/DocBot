import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

interface ViewfinderHUDProps {
  status?: "searching" | "locked" | "capturing";
  videoRef?: React.RefObject<HTMLVideoElement | null>;
}

export function ViewfinderHUD({ status = "searching", videoRef }: ViewfinderHUDProps) {
  const isLocked = status === "locked";
  const accentColor = isLocked ? "border-electric-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)]" : "border-white/40 shadow-none";
  const textColor = isLocked ? "text-electric-emerald" : "text-white/40";

  return (
    <div className={`relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black backdrop-blur-xl ${geistMono.className}`}>
      {/* Live Video Feed */}
      {videoRef && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
      )}
      {/* Corner Markers */}
      <div className={`absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 transition-colors duration-500 ${accentColor}`} />
      <div className={`absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 transition-colors duration-500 ${accentColor}`} />
      <div className={`absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 transition-colors duration-500 ${accentColor}`} />
      <div className={`absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 transition-colors duration-500 ${accentColor}`} />

      {/* Privacy Lock Badge (Spec 314) */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-white/5 backdrop-blur-md">
        <div className="w-1.5 h-1.5 rounded-full bg-electric-emerald shadow-[0_0_5px_#10B981]" />
        <span className="text-[8px] uppercase tracking-[0.2em] text-white/60 whitespace-nowrap">Privacy Lock: Zero-Retention Active</span>
      </div>

      {/* Crosshair */}
      <div className={`absolute top-1/2 left-1/2 h-4 w-px -translate-y-1/2 transition-colors duration-500 ${isLocked ? "bg-electric-emerald/60" : "bg-white/20"}`} />
      <div className={`absolute top-1/2 left-1/2 w-4 h-px -translate-x-1/2 transition-colors duration-500 ${isLocked ? "bg-electric-emerald/60" : "bg-white/20"}`} />

      {/* Metadata Labels */}
      <div className="absolute top-12 left-12 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">ISO: AUTO</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">F: 1.8</span>
      </div>

      <div className="absolute top-12 right-12 flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLocked ? "bg-electric-emerald" : "bg-white/20"}`} />
          <span className={`text-[10px] uppercase tracking-[0.2em] ${textColor}`}>
            {isLocked ? "DOC_LOCKED" : "READY_SCAN"}
          </span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/20">RES: 4K_RAW</span>
      </div>

      {/* Scanning HUD Footer */}
      <div className="absolute bottom-12 left-0 right-0 px-12 text-center">
        <div className={`h-px w-full transition-colors duration-500 ${isLocked ? "bg-electric-emerald/30" : "bg-white/10"} mb-4`} />
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 leading-relaxed">
          {isLocked ? "Stable - Capture Enabled" : "Align document within frame"}
        </p>
      </div>

      {/* Simulated Camera Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
