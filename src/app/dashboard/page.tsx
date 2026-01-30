import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { ViewfinderHUD } from "@/components/camera/viewfinder-hud";
import { SignOut } from "@/components/auth-components";
import { Camera, FileUp } from "lucide-react";
import { Scanline, AmbientGlow } from "@/components/visual-effects";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-deep-slate text-white font-sans overflow-hidden">
      {/* Ambient background effects */}
      <AmbientGlow />
      <Scanline />

      {/* Dashboard Nav */}
      <header className="flex h-16 items-center justify-between px-6 border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-electric-emerald/10 border border-electric-emerald/30 flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <span className="text-electric-emerald text-[10px] font-bold">DB_01</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">System_Terminal</span>
        </div>
        <SignOut />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8 relative z-10">
        {/* Core Vision Area */}
        <div className="relative w-full max-w-md group">
          {/* Viewfinder with simulating 'searching' state */}
          <ViewfinderHUD status="searching" />
          
          {/* Capture Trigger Overlay */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
             <button className="h-24 w-24 rounded-full border-[6px] border-white/5 p-1 bg-black/40 backdrop-blur-md active:scale-95 transition-all shadow-2xl">
               <div className="h-full w-full rounded-full bg-gradient-to-br from-white to-white/80 shadow-[0_0_30px_rgba(255,255,255,0.3)] flex items-center justify-center">
                 <div className="w-8 h-8 rounded-full border-2 border-deep-slate/20" />
               </div>
             </button>
          </div>
        </div>

        {/* Dashboard Actions */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-16 pb-12">
          <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group backdrop-blur-sm">
            <div className="p-4 rounded-2xl bg-electric-emerald/10 text-electric-emerald group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <Camera size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Start Lens</span>
          </button>

          <button className="flex flex-col items-center justify-center gap-3 p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/5 hover:border-white/10 transition-all group backdrop-blur-sm">
            <div className="p-4 rounded-2xl bg-white/5 text-white/60 group-hover:scale-110 transition-transform">
              <FileUp size={24} strokeWidth={1.5} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors">Import Docs</span>
          </button>
        </div>
      </main>

      {/* Footer Status */}
      <footer className="h-10 border-t border-white/5 bg-black/20 flex items-center justify-center px-6">
        <div className="flex items-center gap-4 text-[9px] font-mono tracking-[0.4em] text-white/20 uppercase">
          <span>LATENCY: 14MS</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>AUTH: VERIFIED</span>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span>V_0.1.0</span>
        </div>
      </footer>
    </div>
  );
}
