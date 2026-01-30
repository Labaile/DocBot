import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { SignOut } from "@/components/auth-components";
import { Scanline, AmbientGlow } from "@/components/visual-effects";
import { CameraTerminal } from "@/components/camera/camera-terminal";

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

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <CameraTerminal />
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
