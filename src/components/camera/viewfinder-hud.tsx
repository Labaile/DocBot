import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export function ViewfinderHUD() {
  return (
    <div className={`relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm ${geistMono.className}`}>
      {/* Corner Markers */}
      <div className="absolute top-6 left-6 h-8 w-8 border-t-2 border-l-2 border-electric-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
      <div className="absolute top-6 right-6 h-8 w-8 border-t-2 border-r-2 border-electric-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
      <div className="absolute bottom-6 left-6 h-8 w-8 border-b-2 border-l-2 border-electric-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
      <div className="absolute bottom-6 right-6 h-8 w-8 border-b-2 border-r-2 border-electric-emerald shadow-[0_0_15px_rgba(16,185,129,0.3)]" />

      {/* Crosshair */}
      <div className="absolute top-1/2 left-1/2 h-4 w-px -translate-y-1/2 bg-electric-emerald/40" />
      <div className="absolute top-1/2 left-1/2 w-4 h-px -translate-x-1/2 bg-electric-emerald/40" />

      {/* Metadata Labels */}
      <div className="absolute top-8 left-16 flex flex-col gap-1">
        <span className="text-[10px] uppercase tracking-[0.2em] text-electric-emerald/80">ISO: AUTO</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">F: 1.8</span>
      </div>

      <div className="absolute top-8 right-16 flex flex-col items-end gap-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-emerald animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-electric-emerald">SCAN_ACTIVE</span>
        </div>
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">RES: 4K_RAW</span>
      </div>

      {/* Scanning HUD Footer */}
      <div className="absolute bottom-12 left-0 right-0 px-12 text-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-electric-emerald/20 to-transparent mb-4" />
        <p className="text-[11px] uppercase tracking-[0.3em] text-white/60">
          Align document within frame
        </p>
      </div>

      {/* Simulated Camera Grain Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
